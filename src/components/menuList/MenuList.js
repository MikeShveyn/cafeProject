import MenuItem from "../menuItem/MenuItem";
import React from "react";
import css from "./MenuList.module.css";

function MenuList(props) {
  return (
    <React.Fragment>
      <div className={css.title}>{props.title}</div>
      <ul className={css.list}>
        {props.items.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            description={item.descr}
          />
        ))}
      </ul>
    </React.Fragment>
  );
}

export default MenuList;
