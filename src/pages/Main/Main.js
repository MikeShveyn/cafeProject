import React from "react";
import css from "./Main.module.css";

function Main() {
  return (
    <div>
      <header>
        {/* <blockquote>
            <p>Coffee should be black as Hell, strong as death, and sweet as love.</p>
            <span class="author"><i>-Unknown</i></span>
          </blockquote> */}
        <div className={css.headerImg}>
          <img src="assets/imgs/main-page2.jpg" alt="header" />
          <h1>Coffeen Bar</h1>
        </div>
      </header>

      <main>
        <div className={css.firstBlock}>
          <img src="assets/imgs/main-page1.jpg" alt="header" />
          <div className={css.text}>
          <b>Lorem ipsum dolor sit amet</b>,
           consectetur adipiscing elit.
            Vivamus mattis sem at odio sagittis,
             ut tempor erat accumsan. 
             Proin vel lobortis felis, 
             vitae mattis nunc. 
             Sed quis tellus et velit aliquam rhoncus.
              Donec malesuada sodales porta.
               Morbi at lacus quis metus sodales ullamcorpe
               Mauris suscipit, enim a ullamcorper vulputate, 
               ex lorem feugiat lacus, id iaculis purus lacus sed ipsum.
               nc in pulvinar justo. 
               Nullam mattis dui sit amet feugiat euismod.
                Nam at turpis a urna vestibulum lacinia. 
                Cras eu tempus tellus. 
                Phasellus nec leo sit amet ipsum tristique ultrices.
                 Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                  per inceptos himenaeos. Vivamus dictum magna nulla. 
                  Etiam maximus fermentum fermentum. 
                  Nullam imperdiet pretium mauris,
                   eget scelerisque ligula pharetra tincidunt.
                    Nunc ultricies nulla et metus laoreet,
                     et condimentum nulla porta.
            </div>
        </div>

        <div className={css.secondBlock}>
          <div className={css.text}>
          <b>Lorem ipsum dolor sit amet</b>,
           consectetur adipiscing elit.
            Vivamus mattis sem at odio sagittis,
             ut tempor erat accumsan. 
             Proin vel lobortis felis, 
             vitae mattis nunc. 
             Sed quis tellus et velit aliquam rhoncus.
              Donec malesuada sodales porta.
               Morbi at lacus quis metus sodales ullamcorpe
               Mauris suscipit, enim a ullamcorper vulputate, 
               ex lorem feugiat lacus, id iaculis purus lacus sed ipsum.
               nc in pulvinar justo. 
               Nullam mattis dui sit amet feugiat euismod.
                Nam at turpis a urna vestibulum lacinia. 
                Cras eu tempus tellus. 
                Phasellus nec leo sit amet ipsum tristique ultrices.
                 Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                  per inceptos himenaeos. Vivamus dictum magna nulla. 
                  Etiam maximus fermentum fermentum. 
                  Nullam imperdiet pretium mauris,
                   eget scelerisque ligula pharetra tincidunt.
                    Nunc ultricies nulla et metus laoreet,
                     et condimentum nulla porta.
            </div>
            <img src="assets/imgs/main-page3.jpg" alt="header" />
        </div>

        <div className={css.thirdBlock}>
          <img src="assets/imgs/main-page5.jpg" alt="header" />
          <div className={css.text}>
          <b>Lorem ipsum dolor sit amet</b>,
           consectetur adipiscing elit.
            Vivamus mattis sem at odio sagittis,
             ut tempor erat accumsan. 
             Proin vel lobortis felis, 
             vitae mattis nunc. 
             Sed quis tellus et velit aliquam rhoncus.
              Donec malesuada sodales porta.
               Morbi at lacus quis metus sodales ullamcorpe
               Mauris suscipit, enim a ullamcorper vulputate, 
               ex lorem feugiat lacus, id iaculis purus lacus sed ipsum.
               nc in pulvinar justo. 
               Nullam mattis dui sit amet feugiat euismod.
                Nam at turpis a urna vestibulum lacinia. 
                Cras eu tempus tellus. 
                Phasellus nec leo sit amet ipsum tristique ultrices.
                 Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                  per inceptos himenaeos. Vivamus dictum magna nulla. 
                  Etiam maximus fermentum fermentum. 
                  Nullam imperdiet pretium mauris,
                   eget scelerisque ligula pharetra tincidunt.
                    Nunc ultricies nulla et metus laoreet,
                     et condimentum nulla porta.
            </div>
        </div>
      </main>

      <footer>
        
      </footer>
    </div>
  );
}

export default Main;
