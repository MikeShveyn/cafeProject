import React from "react";
import css from "./Main.module.css";

function Main() {
  return (
    <div>
      <header>
        <blockquote>
            <p>Coffee should be black as Hell, strong as death, and sweet as love.</p>
            <span class="author"><i>-Unknown</i></span>
          </blockquote>
        <div className={css.headerImg}>
          <img src="assets/imgs/main-page-header.jpg" alt="header" />
        </div>
      </header>
      <main>
        
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default Main;
