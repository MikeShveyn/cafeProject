import css from './PlaceOrder.module.css';
import React, { useContext, useEffect, useState } from "react";
import MenuList from "../../components/menuList/MenuList";
import DataContext from "../../store/data-context";
import {getMenuTableData, addMenuTableItem } from "../../store/firebase";
import { useParams } from 'react-router-dom';

function PlaceOrder() {
  const [loadedMenu, setLoadedMenu] = useState([]);
  const [loadedTables, setLoadedTables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(DataContext);
  const {param} = useParams();

  useEffect(() => {
    setIsLoading(true);
    getItems();
  }, []);

  async function getItems() {
      console.log(param);
    try {
      if(param === "TakeAway"){
        const cleanData = await getMenuTableData('menu');
        console.log(cleanData);
        setLoadedMenu(cleanData);
      }
      else if(param === "Inside"){
        const cleanDataTables = await getMenuTableData('table');
        console.log(cleanDataTables);
        setLoadedTables(cleanDataTables.filter((item)=>{
            return item.place === "in";
        }));

        const cleanData = await getMenuTableData('menu');
        console.log(cleanData);
        setLoadedMenu(cleanData.filter((item)=>{
            return item.place === "in";
        }));
      }
      else if(param === "Outside"){
        const cleanDataTables = await getMenuTableData('table');
        console.log(cleanDataTables);
        setLoadedTables(cleanDataTables.filter((item)=>{
            return item.place === "out";
        }));

        const cleanData = await getMenuTableData('menu');
        console.log(cleanData);
        setLoadedMenu(cleanData.filter((item)=>{
            return item.place === "out";
        }));
      }  
       
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
        <MenuList title={"Tables"} dataType={'table'} editMode={false} items={loadedTables} onEditSubmit={() => onEditSubmit()}/>
        <MenuList title={"Menu"} dataType={'menu'} editMode={false} items={loadedMenu} onEditSubmit={() => onEditSubmit()}/>
    </React.Fragment>
  );
}

export default PlaceOrder;
