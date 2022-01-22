import React from "react";
import css from "./MyCard.module.css";
import Card from "../ui/Card/Card";
import { useRef, useContext } from "react";
import AuthContext from "../../store/data-context";

function MyCard(props) {
  const authCtx = useContext(AuthContext);
  const nameInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const menuItem = {
      name: nameInputRef.current.value,
      data: {
        table: authCtx.table,
        menu: authCtx.data,
      },
    };
    props.onAddItem(menuItem);
  }

  function removeMenuItem(item) {
    authCtx.removeData(item);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  function removeTable() {
    authCtx.removeTable();
  }

  return (
    <div className={css.updateMode}>
      <Card>
        <form className={css.form}>
          {props.orderData.menu && (
            <ul className={css.list}>
              {props.orderData.menu.map((item) => {
                return (
                  <div className={css.menuItem} key={getRandomInt(1,10000)}>
                    <p>{item.data.title}</p>
                    <p>{item.data.price + "$"}</p>
                    <button type='button' onClick={() => removeMenuItem(item.id)}>
                        -
                    </button>
                  </div>
                );
              })}
              {props.orderData.table.data && (
                <div className={css.menuItem}>
                  <p>{props.orderData.table.data.title}</p>
                  <button type='button' onClick={() => removeTable()}>
                   -
                 </button>
                </div>
              )}
            </ul>
          )}

          <div className={css.control}>
            <label htmlFor="title">Name</label>
            <input type="text" required id="title" ref={nameInputRef} />
          </div>

          <div className={css.actions}>
            <button type="submit" onClick={submitHandler}>
              Order
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default MyCard;
