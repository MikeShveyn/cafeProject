import {createContext, useState} from 'react';

const DataContext = createContext({
   data : [],
   addData : (newData) => {},
   removeData: (id) => {}
});

export function DataContextProvider(props) {
    const [state, setstate] = useState([]);

    const context = {
        data : state,
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