import React, { useContext, useEffect, useState } from "react";
import MenuList from "../../components/menuList/MenuList";
import AddMenuForm from "../../components/AddMenuForm/AddMenuForm";
import DataContext from "../../store/data-context";
import css from "./Tables.module.css";
import Button from "../../components/ui/Button/Button";
import {getMenuTableData, addMenuTableItem } from "../../store/firebase";

function Tables() {
  const [loadedItems, setLoadedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const context = useContext(DataContext);

  useEffect(() => {
    setIsLoading(true);
    getItems();
  }, []);

  async function getItems() {
    try {
      const cleanData = await getMenuTableData('table');
      console.log(cleanData);
      setLoadedItems(cleanData);
    } catch (err) {
      console.log(err);
    } finally {
      console.log(isAddMenuOpen);
      setIsLoading(false);
    }
  }

  async function addItemHandler(data) {
      try{
        await addMenuTableItem('table' ,data);
        console.log("Sucess");
        setIsAddMenuOpen(false);
        await getItems();
      }catch(err){
        console.log(err);
      }
  }

  async function onEditSubmit(data) {
    try{
      await getItems();
    }catch(err){
      console.log(err);
    }
}

  if (isLoading) {
    return (
      <section>
        <p>Loading ...</p>
      </section>
    );
  }

  return (
    <React.Fragment>
      <div className={css.actions}>
        <Button
          label={isAddMenuOpen ? "Close " + "Editor" : "Open " + "Editor"}
          onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
        />
      </div>
      {isAddMenuOpen && <AddMenuForm onAddItem={addItemHandler} dataType={'table'}/>}
      <MenuList title={"Menu"} dataType={'table'} editMode={true} items={loadedItems} onEditSubmit={() => onEditSubmit()}/>
    </React.Fragment>
  );
}

export default Tables;
