import React from "react";
import css from "./AddMenuForm.module.css";
import Card from "../ui/Card/Card";
import { useRef } from "react";

function AddMenuForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();
  const descrInputRef = useRef();
  const typeHotInputRef = useRef();
  const typeColdInputRef = useRef();
  const typeFoodInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    let typeActive = "";

    if (typeHotInputRef.current.checked) {
      typeActive = typeHotInputRef.current.value;
    } else if (typeColdInputRef.current.checked) {
      typeActive = typeColdInputRef.current.value;
    } else if (typeFoodInputRef.current.checked) {
      typeActive = typeFoodInputRef.current.value;
    }

    const menuItem = {
      title: titleInputRef.current.value,
      image: imageInputRef.current.value,
      price: priceInputRef.current.value,
      descr: descrInputRef.current.value,
      type: typeActive,
    };

    props.onAddItem(menuItem);
  }

  return (
    <div className={css.addMenu}>
      <Card>
        <form className={css.form} onSubmit={submitHandler}>
          <div className={css.control}>
            <label htmlFor="title">Title</label>
            <input type="text" required id="title" ref={titleInputRef} />
          </div>
          <div className={css.control}>
            <label htmlFor="image">Image</label>
            <input type="text" required id="image" ref={imageInputRef} />
          </div>
          <div className={css.control}>
            <label htmlFor="price">Price</label>
            <input type="text" required id="price" ref={priceInputRef} />
          </div>
          <div className={css.controlRadio}>
            <label htmlFor="hot">Hot</label>
            <input
              type="radio"
              value="hot"
              required
              id="hot"
              name="type"
              ref={typeHotInputRef}
            />
            <label htmlFor="hot">Cold</label>
            <input
              type="radio"
              value="cold"
              id="cold"
              name="type"
              ref={typeColdInputRef}
            />
            <label htmlFor="hot">Food</label>
            <input
              type="radio"
              value="food"
              id="food"
              name="type"
              ref={typeFoodInputRef}
            />
          </div>
          <div className={css.control}>
            <label htmlFor="descr">Description</label>
            <textarea rows="5" required id="descr" ref={descrInputRef} />
          </div>
          <div className={css.actions}>
            <button>Add Item</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AddMenuForm;
