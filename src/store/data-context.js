import React from "react";
import {createContext,useState} from 'react';


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
    const [token,settoken]=useState(localStorage.getItem("token"));
    const userIsLoggedIn = !!token;


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
        settoken(token);
        localStorage.setItem("token",token);
    };

    const logOutHadler=()=>{
        settoken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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