import { Link } from "react-router-dom";
import {React} from 'react';

import  css from "./TopNavBar.module.css";

function TopNavBar() {
  return (
    <header className={css.fixed}>
      <div className={css.logoTitle}>CafeShop</div>
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
