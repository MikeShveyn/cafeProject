import React from "react";
import css from "./MenuItem.module.css";
import Card from "../ui/Card/Card";
import { Button } from "../ui/Button/Button";


function MenuItem(props) {
  return (
    <li className={css.container}>
      <Card>
       <Button label={props.editMode ?  "Edit": "Add"} action={() => {props.handleClick()}} /> 
        <div className={css.flex}>
          <img src="assets/imgs/item.png" alt="image" />
          <p className={css.title}>{props.title}</p>
          <p className={css.descr}>{props.description}</p>
          <p className={css.price}>{"Price: " + props.price}</p>
        </div>
      </Card>
    </li>
  );
}

export default MenuItem;
