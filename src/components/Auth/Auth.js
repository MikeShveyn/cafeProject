import React from "react";
import { useState, useRef, useContext } from "react";
import classes from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/data-context";
import Card from "../ui/Card/Card";
import { FormControl,FormControlLabel,FormLabel } from "@material-ui/core";
import { RadioGroup ,Radio} from "@material-ui/core";
import DataContext from "../../store/data-context";
import {createUser, loginUser } from "../../store/firebase"


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

  const submitHandler = async(event) => {
    event.preventDefault();
    setIsLoading(true);
    try{
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      let response = null;
      cleanFormValues();

      if (isLogin) {
         response =  await loginUser(enteredEmail, enteredPassword);
      } else {
         const name = Username.current.value;
         response =  await createUser(name, enteredEmail, enteredPassword, userType);
      }

      if(response) {
        console.log('response ', response);
        authcxt.login(response.token);
        authcxt.addUserData(response.userData)
        history("/");
      }
    }catch(error){
      console.log(error.message)
      alert(error.message);
      setIsLoading(false);
    }
  };


  function cleanFormValues() {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  }

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
