import React from "react";
import { Link } from "react-router-dom";

import css from "./TopNavBar.module.css";

function TopNavBar() {
  return (
    <header className={css.fixed}>
      <div className={css.logoTitle}>
        <img src="assets/imgs/logo.png" alt="header" />
        <span>
          <Link to="/">Coffeen Bar</Link>
        </span>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/Menu">Menu</Link>
          </li>
          <li>
            <Link to="/Order">Order</Link>
          </li>
          <li>
            <Link to="/SignUp">Sign in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default TopNavBar;
