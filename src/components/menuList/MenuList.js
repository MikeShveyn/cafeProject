import MenuItem from "../menuItem/MenuItem";
import React, { useState, useContext } from "react";
import css from "./MenuList.module.css";
import Select from "../ui/Select/Select";
import CafeDialog from "../ui/Dialog/CafeDialog";
import { updateMenuTableData } from "../../store/firebase";
import DataContext from "../../store/data-context";

const FilterType = [
  { id: 1, label: "Select Type", value: "none" },
  { id: 2, label: "Hot", value: "hot" },
  { id: 3, label: "Cold", value: "cold" },
  { id: 4, label: "Food", value: "food" },
];

const FilterPrice = [
  { id: 1, label: "Select Price", value: "none" },
  { id: 2, label: "Price Up", value: "up" },
  { id: 3, label: "Price Down", value: "down" },
];

function MenuList(props) {
  const [filter, setFilter] = useState("none");
  const [price, setPrice] = useState("none");
  const [loading, setLoading] = useState(false);
  const [currentMenuData, setCurrentMenuData] = useState(null);
  const [openDialog, setDialogOpen] = useState(false);
  const context = useContext(DataContext);

  const handleFilter = (value) => {
    setFilter(value);
  };

  const handlePrice = (value) => {
    setPrice(value);
  };

  const handleEdit = (id, data, table) => {
    if(props.editMode) {
      setCurrentMenuData({ id: id, data: data });
      setDialogOpen(true);
    }else{

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000); 
      
      if(table){
        context.addTable({id:id, data: data});
      }else{
        context.addData({ id: id , data: data });
      }
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const onDialogSubmit = async (data) => {
    try {
      await updateMenuTableData(props.dataType, data.id, data.data);
      setDialogOpen(false);
      props.onEditSubmit();
    } catch (er) {
      console.error(er);
    }
  };

  return (
    <React.Fragment>
      <div className={css.title}>{props.title}</div>
      {props.dataType === "menu" && (
        <div className={css.filterGroup}>
          <Select items={FilterType} onChange={handleFilter} />
          <Select items={FilterPrice} onChange={handlePrice} />
        </div>
      )}

      {props.items ? (
        <ul className={css.list}>
          {props.items
            .filter((item) => {
              if (filter !== "none") {
                return item.type === filter;
              } else {
                return item;
              }
            })
            .sort((a, b) => {
              if (price === "up") {
                return a.price - b.price;
              } else if (price === "down") {
                return b.price - a.price;
              } else {
                return;
              }
            })
            .map((item) =>
              props.dataType === "menu" ? (
                <MenuItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  description={item.descr}
                  handleClick={() =>
                    handleEdit(item.id, {
                      title: item.title,
                      image: item.image,
                      price: item.price,
                      descr: item.descr,
                      type: item.type,
                      place : item.place
                    },false)
                  }
                  editMode={props.editMode}
                />
              ) : (
                <MenuItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  description={item.descr}
                  avaliable = {item.avaliable}
                  place = {item.place}
                  handleClick={() =>
                    handleEdit(item.id, {
                      title: item.title,
                      image: item.image,
                      descr: item.descr,
                      place : item.place,
                      avaliable : item.avaliable
                    },
                    true)
                  }
                  editMode={props.editMode}
                />
              )
            )}
        </ul>
      ) : (
        <p>No items avaliable...</p>
      )}
      <CafeDialog
        openDialog={openDialog}
        dataType={props.dataType}
        menuData={currentMenuData}
        onDialogClose={() => handleDialogClose()}
        onDialogSubmit={onDialogSubmit}
      />
      <div className={loading && context.isLoggedIn ? css.lotte : css.none}>
        <img src={require("../../imgs/coffee-maker.gif")}/>
      </div>
    </React.Fragment>
  );
}

export default MenuList;
