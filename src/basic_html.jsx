import React from 'react';
import './App.css';


const basic_html = () => {
  return (
    <div>
      <header>
        <div className="first">
          <div className="photo">
            <img src="google_png.png" width="100" alt="logo" />
          </div>

          <div className="searcharea">
            <div className="search">
              <input type="text" />
              <span>
                <i className="fa-solid fa-xmark"></i> |
                <i className="fa-solid fa-microphone"></i>
                <i className="fa-solid fa-camera"></i>
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
          </div>

          <div className="icons">
            <i className="fa-solid fa-flask sideicon"></i>
            <i className="fa-solid fa-bars sideicon"></i>
            <i className="fa-solid fa-user sideicon"></i>
          </div>
        </div>

        <div className="second">
          <span>All</span>
          <span>Image</span>
          <span>Video</span>
          <span>Shorts</span>
          <span>News</span>
          <span>Maps</span>
          <span>Forms</span>
          <span>More</span>
        </div>
      </header>

      <main>
        <div className="left">
          {Array(6).fill().map((_, i) => (
            <div className="div11" key={i}>
              <a href="https://www.instagram.com">
                <div className="links">
                  <div className="logo">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                </div>
              </a>

              <a href="#">
                <div className="username">
                  <div>Instagram</div>
                  <div>
                    https://www.instagram.com&nbsp;&nbsp;
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                </div>
              </a>

              <a href="https://www.instagram.com">
                <div className="handle">Hemaksh Kumawat (@hemaksh.kmwt)</div>
              </a>

              <div className="description">
                643 followers · 569 following · 46 posts · @hemaksh.kmwt: “JAY SHREE RAM KSHATRIYA ⚔️
                <br />
                Everything based on #karma The statement of every programmer should ...
              </div>
            </div>
          ))}
        </div>

        <div className="right">
          dvgyhuijn
          <div className="line"></div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default basic_html;
