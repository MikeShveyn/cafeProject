import React from "react";
import css from "./MenuItem.module.css";
import Card from "../ui/Card/Card";
import { Button } from "../ui/Button/Button";

function MenuItem(props) {
  return (
    <li className={css.container}>
      <Card>
        <Button
          label={props.editMode ? "Edit" : "Add"}
          onClick={() => {
            props.handleClick();
          }}
        />
        <div className={css.flex}>
          {props.avaliable ? 
            <img src={require("../../imgs/default_table.jpg")} alt="image" />
          :
          <img src={require("../../imgs/item.png")} alt="image" />
            } 
          <p className={css.title}>{props.title}</p>
          <p className={css.descr}>{props.description}</p>
          {props.price && (
            <p className={css.price}>{"Price: " + props.price}</p>
          )}
          {props.place && (
            <p className={css.price}>{props.place === 'in' ? 'Inside' : 'Outside'}</p>
          )}
          {props.avaliable && (
            <p className={css.price}>{props.avaliable ? 'Avaliable' : 'Not Avaliable'}</p>
          )}
        </div>
      </Card>
    </li>
  );
}

export default MenuItem;
