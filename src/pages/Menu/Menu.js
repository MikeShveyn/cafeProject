import React, { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import MenuList from "../../components/menuList/MenuList";
import AddMenuForm from "../../components/AddMenuForm/AddMenuForm";
import DataContext from "../../store/data-context";
import css from "./Menu.module.css";

function Menu() {
  const [loadedItems, setLoadedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(()=> {
    setIsLoading(true);
    getItems();
  },[]);

  function getItems() {
    fetch(
      context.firebaseConfig.databaseURL+'/menuItems.json'
      ).then((response) => {
        if(response.ok){
          return response.json();
        }else{
          console.log('Error from DB');
        }
      }).then((data) => {
        const cleanData = [];
        for(const key in data) {
            const item = {
              id: key,
              ...data[key]
            }
            cleanData.push(item);
        }
        console.log(cleanData);
        setLoadedItems(cleanData);
      }).catch(er => {
        console.log(er);
      }).finally(()=>{
        setIsLoading(false);
      })
  }

  function addItemHandler(data) {
    fetch(context.firebaseConfig.databaseURL+'/menuItems.json', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log("Sucess");
        navigate('/');
      })
      .catch((er) => {
        console.log(er);
      });
  };

  if(isLoading) {
    return (
      <section>
        <p>Loading ...</p>
      </section>
    )
  }

  return (
    <React.Fragment>
      <AddMenuForm onAddItem={addItemHandler} />
      <MenuList title={"Hot Drinks"} items={loadedItems.filter((item)=>{
        return item.type === 'hot';
      })}/>
      <MenuList title={"Cold Drinks"} items={loadedItems.filter((item)=>{
        return item.type === 'cold';
      })}/>
    </React.Fragment>
  );
}

export default Menu;
