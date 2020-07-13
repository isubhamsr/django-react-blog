import React, { Component }  from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions/Auth'
const { Header, Content, Footer } = Layout;



class CustomLayout extends Component {

    state = {
        redirect: false
    }

    handleLogout = () =>{
        this.props.onLogout()
        this.setState({ redirect: true })
        return( <Redirect to="/signin" />)
    }

    render() {
        return (
            <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" >
                {/* defaultSelectedKeys={['1']} */}
                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                    {
                        this.props.idAuthenticated ?
                        <Menu.Item key="2" onClick={this.handleLogout}>Log Out</Menu.Item>
                        :
                        <Menu.Item key="2"><Link to="/signin">Sign In</Link></Menu.Item>
                    }
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
                    {/* <Breadcrumb.Item>App</Breadcrumb.Item> */}
                </Breadcrumb>
                <div className="site-layout-content">
                    {this.props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        )
    }
}


const mapStateToProps = (state)=>{
    return{
        loading: state.loading,
        err : state.err
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onLogout : ()=>{dispatch(actions.authLogout())}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(CustomLayout)