import React from "react";
import css from "./Main.module.css";

function Main() {
  return (
    <div>
      <header>
        <div className={css.headerImg}>
          <img src={require("../../imgs/main-page2.jpg")} alt="header" />
          <h1>Coffeen Bar</h1>
        </div>
      </header>

      <main>
        <div className={css.firstBlock}>
          <img src={require("../../imgs/main-page1.jpg")} alt="header" />
          <div className={css.text}>
          <blockquote>Coffee, the favorite drink of the civilized world.</blockquote>
          <figcaption>-Thomas Jefferson</figcaption>
            </div>
        </div>

        <div className={css.secondBlock}>
          <div className={css.text}>
            <blockquote>Black as night, sweet as sin.</blockquote>
            <figcaption>-Neil Gaiman</figcaption>
          </div>
            <img src={require("../../imgs/main-page3.jpg")} alt="header" />
        </div>

        <div className={css.thirdBlock}>
          <img src={require("../../imgs/main-page5.jpg")} alt="header" />
          <div className={css.text}>
            <blockquote>Coffee is a hug in a mug.</blockquote>
            <figcaption>-Anonymous</figcaption>
            </div>
        </div>
      </main>

      <footer>
        
      </footer>
    </div>
  );
}

export default Main;
