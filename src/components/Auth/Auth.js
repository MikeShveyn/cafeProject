import React from "react";
import { useState, useRef, useContext } from "react";
import classes from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/data-context";
import Card from "../ui/Card/Card";
import { FormControl,FormControlLabel,FormLabel } from "@material-ui/core";
import { RadioGroup ,Radio} from "@material-ui/core";
import DataContext from "../../store/data-context";


function Auth() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const Username=useRef();
  const [userType, setuserType] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const authcxt = useContext(AuthContext);
  const history = useNavigate();
  const context = useContext(DataContext);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleChange=(event)=>{
    setuserType(event.target.value);
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
        const state=[enteredEmail];
        localStorage.setItem('user', state);
    } else {
      const enteredName=Username.current.value;
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0-hEc_79Do9rcDUUFa4TklGJui3jbAWI";
        fetch(context.firebaseConfig.databaseURL + "/users.json", {
          method: "POST",
          body: JSON.stringify({
            name:enteredName,
            email:enteredEmail,
            password:enteredPassword,
            type:userType
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          console.log("Sucess");
        })
        .catch((er) => {
          console.log(er);
        });
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
          <form onSubmit={submitHandler}>
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
              {!isLogin && (
                <div className={classes.control}> 
                  <label htmlFor="text">Your name:</label>
                  <input type='text' id='name' required ref={Username}/>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">You are:</FormLabel>
                    <RadioGroup row aria-label="UserT" name="use-radio-group" onClick={handleChange}>
                      <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                      <FormControlLabel value="Waiter" control={<Radio />} label="Waiter" />
                    </RadioGroup>
                  </FormControl>
                </div>
              )}
            </div>
            <div className={classes.actions}>
              {!isLoading && (
               <button>{isLogin ? 'Login' : 'Create Account'}</button>
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
