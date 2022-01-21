import React from "react";
import {createContext, useState} from 'react';

const DataContext = createContext({
   data : [],
   user : null, 
   addData : (newData) => {},
   removeData: (id) => {},
   addUserData : (newUser) => {},
   removeUserData: (id) => {},
   token:null,
   isLoggedIn:false,
   login:(token)=>{},
   logout:()=>{}
});

export const DataContextProvider=(props)=>{
    const [dataState, setData] = useState([]);
    const [userState , setUser] = useState(null);
    const [token,settoken]=useState(null);
    const userIsLoggedIn = !!token;

    function addDataHandler(newData) {
        setData((prevData)=>{
            return prevData.concat(newData);
        })
    }

    function removeDataHandler(id) {
        setData((prevData)=>{
            return prevData.filter(id=>prevData.id !== id);
            });
    }

      function addUserHandler(newUser) {
        console.log('new user ', newUser);
        setUser(newUser);
    }

    function removeUserHandler() {
        setUser(null);
    }

    const logInHadler=(token)=>{
        console.log('token ', token);
        settoken(token);
    };

    const logOutHadler=()=>{
        settoken(null);
        setUser(null);
    };

    const context = {
        data : dataState,
        user: userState,
        token: token,
        isLoggedIn:userIsLoggedIn,
        addData : addDataHandler,
        removeData: removeDataHandler,
        addUserData : addUserHandler,
        removeUserData: removeUserHandler,
        login:logInHadler,
        logout:logOutHadler
    };

    return <DataContext.Provider value={context}>
        {props.children}
    </DataContext.Provider>
}

export default DataContext;