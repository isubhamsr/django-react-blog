import React from 'react';
import 'antd/dist/antd.css';
import './App.css'
import LayOut from './containers/Layout';
import ArticleListView from './containers/ArticleListView';

function App() {
  return (
    <LayOut>
      <ArticleListView />
    </LayOut>
  );
}

export default App;
