import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.css'
import CustomLayout from './containers/Layout';
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/Auth'
import BaseRoute from './route';


class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignin()
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
