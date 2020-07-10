import React from 'react';
import 'antd/dist/antd.css';
import './App.css'
import LayOut from './containers/Layout';
import { BrowserRouter } from 'react-router-dom'
import BaseRoute from './route';

function App() {
  return (
    <BrowserRouter>
      <LayOut>
        <BaseRoute />
      </LayOut>
    </BrowserRouter>
  );
}

export default App;
