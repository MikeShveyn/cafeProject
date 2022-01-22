import React from "react";
import { createContext, useState, useEffect } from "react";

const DataContext = createContext({
  data: [],
  table: {},
  userInLocStor: null,
  user: null,
  addData: (newData) => {},
  removeData: (id) => {},
  addUserData: (newUser) => {},
  removeUserData: (id) => {},
  addTable: (newTable) => {},
  removeTable: () => {},
  clearCard: () => {},
  token: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const DataContextProvider = (props) => {
  const [dataState, setData] = useState([]);
  const [tableState, setTable] = useState({});
  const [userState, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [token, settoken] = useState(null);
  const userIsLoggedIn = !!token;


  
  useEffect(() => {
     const tempToken = CheckExpiry("token");
    if (tempToken === null) {
      logOutHadler();
    }else{
      settoken(tempToken);
    }
  }, []);

  function addDataHandler(newData) {
    setData((prevData) => {
      return prevData.concat(newData);
    });
  }

  function removeDataHandler(id) {
    setData((prevData) => {
      return prevData.filter((prv) => prv.id !== id);
    });
  }

  function addTableHandler(newTable) {
    setTable(newTable);
  }

  function removeTableHandler() {
    setTable({});
  }

  function clearCardHandle() {
    setTable({});
    setData([]);
  }

  function addUserHandler(newUser) {
    setUser(newUser);
    DataContext.user = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  function removeUserHandler() {
    setUser(null);
  }

  const logInHadler = (token) => {
    const now = new Date();
    settoken(token);
    const ttl = 600000 * 6;
    const item = JSON.stringify({
      token: token,
      expiry: now.getTime() + ttl,
    });
    localStorage.setItem("token", item);
  };

  const logOutHadler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    settoken(null);
    setUser(null);
  };

  function CheckExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
  
      return null;
    }
    return item.token;
  }

  const context = {
    data: dataState,
    table: tableState,
    user: userState,
    token: token,
    isLoggedIn: userIsLoggedIn,
    addData: addDataHandler,
    removeData: removeDataHandler,
    addTable: addTableHandler,
    removeTable: removeTableHandler,
    addUserData: addUserHandler,
    removeUserData: removeUserHandler,
    login: logInHadler,
    logout: logOutHadler,
    clearCard: clearCardHandle,
  };

  return (
    <DataContext.Provider value={context}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
