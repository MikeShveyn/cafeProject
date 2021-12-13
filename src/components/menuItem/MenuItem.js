import React from 'react';
import css from "./MenuItem.module.css";
import Card from "../ui/Card/Card";

function MenuItem(props) {
  return (
    <li className={css.container}>
      <Card>
        <div className={css.flex}>
          <img src="assets/imgs/item.png" alt="image" />
          <p className={css.title}>{props.title}</p>
          <p className={css.descr}>{props.description}</p>
          <p className={css.price}>{'Price: ' +  props.price}</p>
        </div>
      </Card>
    </li>
  );
}

export default MenuItem;
