import React, { useContext, useEffect, useState } from "react";
import MenuList from "../../components/menuList/MenuList";
import AddMenuForm from "../../components/AddMenuForm/AddMenuForm";
import DataContext from "../../store/data-context";
import css from "./Menu.module.css";
import Button from "../../components/ui/Button/Button";

function Menu() {
  const [loadedItems, setLoadedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const context = useContext(DataContext);

  useEffect(() => {
    setIsLoading(true);
    getItems();
  }, []);

  function getItems() {
    fetch(context.firebaseConfig.databaseURL + "/menuItems.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Error from DB");
        }
      })
      .then((data) => {
        const cleanData = [];
        for (const key in data) {
          const item = {
            id: key,
            ...data[key],
          };
          cleanData.push(item);
        }
        console.log(cleanData);
        setLoadedItems(cleanData);
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => {
        console.log(isAddMenuOpen);
        setIsLoading(false);
      });
  }

  function addItemHandler(data) {
    fetch(context.firebaseConfig.databaseURL + "/menuItems.json", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log("Sucess");
        setIsAddMenuOpen(false);
      })
      .catch((er) => {
        console.log(er);
      });
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
          action={() => setIsAddMenuOpen(!isAddMenuOpen)}
        />
      </div>
      {isAddMenuOpen && <AddMenuForm onAddItem={addItemHandler} />}
      <MenuList title={"Menu"} items={loadedItems} />
    </React.Fragment>
  );
}

export default Menu;
