import React from 'react';
import './About.css';

function About() {
  return (
    <div className="major-container">
    <div className="about-container">
      <h1 className="about-title">
        Welcome to <span className="highlight">CineScore</span>
      </h1>

      <p className="about-tagline">Your Ultimate Destination for Movies, Trailers, Cast & More</p>

      <section>
        <h2 className="section-title">🎬 What is CineScore?</h2>
        <p className="about-paragraph">
          <strong>CineScore</strong> is a dynamic movie discovery platform built with the goal of providing users a fast, modern, and visually appealing experience to explore the world of cinema. The platform offers users access to trending movies, upcoming releases, detailed cast info, trailers, and movie overviews — all in one place.
        </p>
        <p className="about-paragraph">
          Powered by the <strong>TMDB (The Movie Database) API</strong>, CineScore fetches real-time data so users never miss out on what’s hot in the entertainment world. Whether you’re a hardcore movie buff or someone just looking for a good film to watch tonight, CineScore offers a seamless experience with an intuitive UI, stylish layout, and reliable information.
        </p>
        <p className="about-paragraph">
          Unlike other movie websites that often feel cluttered or outdated, CineScore focuses on delivering simplicity with power. Users can browse trending titles, search any movie instantly, check out trailers, view top cast, and read full overviews — all in a sleek, mobile-friendly design.
        </p>
      </section>
      <br />
      <section>
        <h2 className="section-title">✨ Core Features</h2>
        <ul className="about-list">
          <li>🔥 Real-time trending movies updated weekly</li>
          <li>🗓 Discover upcoming movies with exact release dates</li>
          <li>🎞 View trailers and video clips right on the detail page</li>
          <li>👥 Explore top-billed cast and movie overviews</li>
          <li>🔍 Quick and accurate search by title or genre</li>
          <li>📺 Explore TV shows and movie genres</li>
        </ul>
      </section>
      <br />
      <section>
        <h2 className="section-title">🛠️ Technology Stack</h2>
        <ul className="about-list">
          <li><strong>React.js</strong> – Component-based frontend for interactive UI</li>
          <li><strong>React Router DOM</strong> – For clean client-side navigation</li>
          <li><strong>TMDB API</strong> – Fetching real-time movie and TV data</li>
          <li><strong>CSS</strong> – For custom styling and responsive layout</li>
        </ul>
      </section>
<br />
      <section>
        <h2 className="section-title">👨‍💻 Meet the Developers</h2>

        <div className="dev-team">
          <div className="dev-card">
            <h5>Himanshu Salvi</h5>
            <p><strong>Email:</strong> himanshu@example.com</p>
            <p><strong>Contact:</strong> +91-9876543210</p>
          </div>

          <div className="dev-card">
            <h5>Hemaksh Kumawat</h5>
            <p><strong>Email:</strong> <br /> hemaksh@example.com</p>
            <p><strong>Contact:</strong> +91-9123456789</p>
          </div>

          <div className="dev-card">
            <h5>Jaya Patidar</h5>
            <p><strong>Email:</strong> <br /> jaya@example.com</p>
            <p><strong>Contact:</strong> +91-9012345678</p>
          </div>
        </div>
      </section>

        <footer className="about-footer">
        <p>© 2025 CineScore | Built with ❤️ By Team CineScore</p>
      </footer>
    </div>
    </div>
  );
}

export default About;
