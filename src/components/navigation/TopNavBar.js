import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import css from "./TopNavBar.module.css";
import AuthContext from '../../store/data-context';
import {useNavigate} from 'react-router-dom';

function TopNavBar() {
  const authCtx=useContext(AuthContext);
  const isLoggedIn=authCtx.isLoggedIn;
  const history=useNavigate();

  const logOutButtonHandler=()=>{
    authCtx.logout();
    history('/');
  }

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
          {!isLoggedIn && (
            <li>
            <Link to="/SignIn">LogIn</Link>
          </li>
          )}
           {isLoggedIn && (
            <li>
              <div className="classes.welcome">
              <p>Hello, {}</p>
              </div>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button className={css.logOut} onClick={logOutButtonHandler}>LogOut</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default TopNavBar;
