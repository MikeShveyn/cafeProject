import React from 'react';
import AuthForm from '../../components/Auth/Auth';
import css from "./AuthPage.module.css";


const AuthPage = () => {
  return (
    <div className={css.container}>
      <AuthForm />
    </div>
  ) ;
};

export default AuthPage;