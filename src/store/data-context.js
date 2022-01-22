import React from "react";
import {createContext,useState,useEffect} from 'react';



const DataContext = createContext({
   data : [],
   userInLocStor:null,
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
    const [userState , setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [token,settoken]=useState();
    const userIsLoggedIn = !!token;
    useEffect(()=>{
            settoken(CheckExpiry("token"));
            if(token === null){
                logOutHadler(); 
        }
    },[]);

    function addDataHandler(newData) {
        setData((prevData)=>{
            return prevData.concat(newData);
        })
    }

    function removeDataHandler(id) {
        setData((prevData)=>{
            return prevData.filter(prv=>prv.id !== id);
            });
    }


      function addUserHandler(newUser) {
        console.log('new user ', newUser);
        setUser(newUser);
        DataContext.user=newUser;
        localStorage.setItem("user",JSON.stringify(newUser));
    }

    function removeUserHandler() {
        setUser(null);
    }

    const logInHadler=(token)=>{
        const now = new Date();
        settoken(token);
        const ttl=600000 * 6;
        const item = JSON.stringify({
            token: token,
            expiry: now.getTime() + ttl,
        });
        console.log(item);
        localStorage.setItem("token",item);
    };

    const logOutHadler=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        settoken(null);
        setUser(null);
    };

    function CheckExpiry(key) {
        const itemStr = localStorage.getItem(key);
        const item = JSON.parse(itemStr)
        const now = new Date()
        if (now.getTime() > item.expiry || !itemStr) {
            // if the item doesn't exist, set null
            // If the item is expired, delete the item from storage
            // and return null
            logOutHadler();
            return null;
        }
        return item.value;
    }

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