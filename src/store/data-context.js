import {createContext, useState} from 'react';

const DataContext = createContext({
   data : [],
   firebaseConfig,
   addData : (newData) => {},
   removeData: (id) => {}
});

export function DataContextProvider(props) {
    const [state, setstate] = useState([]);

    const context = {
        data : state,
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
        removeData: removeDataHandler
    };
    // manage state (state for all components listening for changes )
    function addDataHandler(newData) {
        setstate((prevData)=>{
            return prevData.concat(newData);
        })
    }

    function removeDataHandler(id) {
        setstate((prevData)=>{
            return prevData.filter(id=>prevData.id !== id);
            });
    }




    return <DataContext.Provider value={context}>
        {props.children}
    </DataContext.Provider>
}

export default DataContext;