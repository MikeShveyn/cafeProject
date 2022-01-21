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
  const placeInInputRef = useRef();
  const placeOutInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    let typeActive = "";
    let placeActive = "";

    if (typeHotInputRef.current.checked) {
      typeActive = typeHotInputRef.current.value;
    } else if (typeColdInputRef.current.checked) {
      typeActive = typeColdInputRef.current.value;
    } else if (typeFoodInputRef.current.checked) {
      typeActive = typeFoodInputRef.current.value;
    }

    if(placeInInputRef.current.checked){
      placeActive = placeInInputRef.current.value;
    }else if(placeOutInputRef.current.checked){
      placeActive = placeOutInputRef.current.value;
    }

    const menuItem = {
      title: titleInputRef.current.value,
      image: imageInputRef.current.value,
      price: priceInputRef.current.value,
      descr: descrInputRef.current.value,
      type: typeActive,
      place: placeActive
    };

    props.onAddItem(menuItem);
  }

  return (
    <div className={props.updateMode? css.updateMode : css.addMenu}>
      <Card>
        <form className={css.form} onSubmit={submitHandler}>
          <div className={css.control}>
            <label htmlFor="title">Title</label>
            <input type="text" required id="title" ref={titleInputRef}  defaultValue={props.updateMode? props.updateMode.title : ''} />
          </div>
          <div className={css.control}>
            <label htmlFor="image">Image</label>
            <input type="text" required id="image" ref={imageInputRef}  defaultValue={props.updateMode? props.updateMode.image : ''}/>
          </div>
          <div className={css.control}>
            <label htmlFor="price">Price</label>
            <input type="text" required id="price" ref={priceInputRef}  defaultValue={props.updateMode? props.updateMode.price : ''}/>
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
          <div className={css.controlRadio}>
            <label htmlFor="in">Inside</label>
            <input
              type="radio"
              value="in"
              required
              id="in"
              name="place"
              ref={placeInInputRef}
            />
            <label htmlFor="in">Ousdide</label>
            <input
              type="radio"
              value="out"
              id="out"
              name="place"
              ref={placeOutInputRef}
            />
          </div>
          <div className={css.control}>
            <label htmlFor="descr">Description</label>
            <textarea rows="5" required id="descr" ref={descrInputRef} defaultValue={props.updateMode? props.updateMode.descr: ''} />
          </div>
          <div className={css.actions}>
            <button>{props.updateMode? 'Update Item' : 'Add Item' } </button> 
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AddMenuForm;
