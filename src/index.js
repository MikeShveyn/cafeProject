import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import {DataContextProvider} from './store/data-context';


ReactDOM.render(
  <DataContextProvider>
    <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContextProvider>,
  document.getElementById('root'));


