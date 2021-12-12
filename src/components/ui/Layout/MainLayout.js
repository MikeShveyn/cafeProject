import React from "react";
import TopNavBar from "../../navigation/TopNavBar";
import css from "./MainLayout.module.css";

function Container(props) {
  return (
    <div>
      <TopNavBar />
      <div className={css.content}>{props.children}</div>
    </div>
  );
}

export default Container;
