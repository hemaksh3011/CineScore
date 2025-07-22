// HeartButton.js
import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// import './HeartButton.css'; // Optional styling

function HeartButton({ movie }) {
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                const docRef = doc(db, "watchlists", firebaseUser.uid);
                const docSnap = await getDoc(docRef);
                const movies = docSnap.exists() ? docSnap.data().movies || [] : [];
                setWatchlist(movies);
                setIsInWatchlist(movies.some(m => m.id === movie.id));
            } else {
                setUser(null);
                setWatchlist([]);
                setIsInWatchlist(false);
            }
        });
        return () => unsubscribe();
    }, [movie.id]);

    const toggleWatchlist = async () => {
        if (!user) {
            alert("Login to add/remove from watchlist");
            return;
        }

        const docRef = doc(db, "watchlists", user.uid);
        let updated;

        try {
            if (isInWatchlist) {
                await updateDoc(docRef, {
                    movies: arrayRemove(movie)
                });
                updated = watchlist.filter((m) => m.id !== movie.id);
            } else {
                await setDoc(docRef, {}, { merge: true });
                await updateDoc(docRef, {
                    movies: arrayUnion(movie)
                });
                updated = [...watchlist, movie];
            }
            setWatchlist(updated);
            setIsInWatchlist(!isInWatchlist);
        } catch (err) {
            console.error("Error updating watchlist:", err);
        }
    };

    return (
        <button
            className={`like-button ${isInWatchlist ? "liked" : "unliked"}`}
            onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist();
            }}
            title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        >
            {isInWatchlist ? "❌" : "❤️"}
        </button>

    );
}

export default HeartButton;
