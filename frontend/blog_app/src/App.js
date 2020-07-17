import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.css'
import CustomLayout from './containers/Layout';
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/Auth'
import BaseRoute from './route';
import {Helmet} from "react-helmet";
// import Prism from 'prismjs'
// import 'prismjs/themes/prism-okaidia.css'
// import 'prismjs/components/prism-handlebars.min.js'
// import 'prismjs/components/prism-javascript.min.js'
// // import '../public/prism'

class App extends Component {
  
  componentDidMount(){
    // Prism.highlightAll();
    this.props.onTryAutoSignin()
    // this.renderScript()
    
    
    
  }

  render() {
    return (
      <BrowserRouter>
      <CustomLayout {...this.props}>
        <BaseRoute />
      </CustomLayout>
    </BrowserRouter>
    )
  }
}


const mapStatetoProps = (state) =>{
  return{
    idAuthenticated : state.token !== null
  }
}

const mapDispatchToProps = (dispath) =>{
  return{
    onTryAutoSignin: ()=>{dispath(actions.authCheckState())}
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(App);
