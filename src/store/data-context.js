import React from "react";
import {createContext, useState} from 'react';

const DataContext = createContext({
   data : [],
   user : null, 
   firebaseConfig : null,
   addData : (newData) => {},
   removeData: (id) => {},
   addUserData : (newUser) => {},
   removeUserData: (id) => {},
   token:'',
   isLoggedIn:false,
   login:(token)=>{},
   logout:()=>{}
});

export const DataContextProvider=(props)=>{
    const [dataState, setData] = useState([]);
    const [userState , setUser] = useState(null);
    const [token,settoken]=useState();


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
        setUser(newUser);
    }

    function removeUserHandler() {
        setUser(null);
    }

    const logInHadler=(token)=>{
        settoken(token);
    };

    const logOutHadler=()=>{
        settoken(null);
    };

    const context = {
        data : dataState,
        user: userState,
        token: token,
        isLoggedIn:userIsLoggedIn,
        firebaseConfig : {
            apiKey: "AIzaSyA0-hEc_79Do9rcDUUFa4TklGJui3jbAWI",
            authDomain: "cafe-f0195.firebaseapp.com",
            databaseURL: "https://cafe-f0195-default-rtdb.firebaseio.com",
            projectId: "cafe-f0195",
            storageBucket: "cafe-f0195.appspot.com",
            messagingSenderId: "323160095814",
            appId: "1:323160095814:web:18b3004470a140feddde47"
          },
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