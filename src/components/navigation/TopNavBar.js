import React from "react";
import { Link } from "react-router-dom";

import  css from "./TopNavBar.module.css";

function TopNavBar() {
  return (
    <header className={css.fixed}>
      <div className={css.logoTitle}>Coffeen</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
          <li>
            <Link to="/Order">Order</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default TopNavBar;
