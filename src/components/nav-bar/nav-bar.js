import React from "react";

import "./nav-bar.scss";

const NavBar = () => {

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <a href="https://veiag.github.io/"><i className="fa-solid fa-house"></i></a>
        <span id="logo">
         Мої проєкти
        </span>
      </div>
    </nav>
  );
}

export default NavBar;