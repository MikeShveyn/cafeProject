import React from "react";
import { useState, useRef, useContext } from "react";
import classes from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/data-context";
import Card from "../ui/Card/Card";
import Button from "../ui/Button/Button";

function Auth() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const authcxt = useContext(AuthContext);
  const history = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0-hEc_79Do9rcDUUFa4TklGJui3jbAWI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0-hEc_79Do9rcDUUFa4TklGJui3jbAWI";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authcxt.login(data.idToken);
        history("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.auth}>
      <Card>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <form>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <div className={classes.actions}>
              {!isLoading && (
               <Button label={isLogin ? "Login" : "Create Account"}
                action={submitHandler}/>
              )}
              {isLoading && <p>Sending request...</p>}
              <button
                type="button"
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "Create new account" : "Login with existing account"}
              </button>
            </div>
          </form>
      </Card>
    </div>
  );
}

export default Auth;
