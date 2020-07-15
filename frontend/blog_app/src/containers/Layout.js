import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions/Auth'
const { Header, Content, Footer } = Layout;



class CustomLayout extends Component {

    state = {
        redirect: false
    }

    handleLogout = () => {
        this.props.onLogout()
        this.setState({ redirect: true })
        return (<Redirect to="/signin" />)
    }

    render() {
        return (
            <body class="d-flex flex-column h-100">

                <header>
                    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                        <div class="container-fluid">
                            <Link class="navbar-brand" to="/">Coding School</Link>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarCollapse">
                                <ul class="navbar-nav mr-auto mb-2 mb-md-0">
                                    <li class="nav-item active">
                                        <Link class="nav-link" aria-current="page" to="#">Home</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="#">Link</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
                                    </li>
                                </ul>
                                <form class="d-flex">
                                    <input class="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button class="btn btn-outline-success" type="submit">Search</button>
                                </form>
                                {
                                    this.props.idAuthenticated ?
                                    <button class="btn btn-outline-success m-2" onClick={this.handleLogout}>Log Out</button>
                                    :
                                    <Link to="/signin" class="btn btn-outline-success m-2" onClick={this.handleLogout}>Sign In</Link>
                                }
                            </div>
                        </div>
                    </nav>
                </header>

                <main class="flex-shrink-0">
                    <div class="container">
                        {this.props.children}
                    </div>
                </main>

                <footer class="footer mt-auto py-3 bg-light">
                    <div class="container">
                        <span class="text-muted">Place sticky footer content here.</span>
                    </div>
                </footer>
            </body>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        err: state.err
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(actions.authLogout()) }
    }
}









export default connect(mapStateToProps, mapDispatchToProps)(CustomLayout)

// <Layout className="layout">
//             <Header>
//                 <div className="logo" />
//                 <Menu theme="dark" mode="horizontal" >
//                 {/* defaultSelectedKeys={['1']} */}
//                     <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
//                     {
//                         this.props.idAuthenticated ?
//                         <Menu.Item key="2" onClick={this.handleLogout}>Log Out</Menu.Item>
//                         :
//                         <Menu.Item key="2"><Link to="/signin">Sign In</Link></Menu.Item>
//                     }
//                 </Menu>
//             </Header>
//             <Content style={{ padding: '0 50px' }}>
//                 <Breadcrumb style={{ margin: '16px 0' }}>
//                     <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
//                     <Breadcrumb.Item><Link to="/">List</Link></Breadcrumb.Item>
//                     {/* <Breadcrumb.Item>App</Breadcrumb.Item> */}
//                 </Breadcrumb>
//                 <div className="site-layout-content">
//                     {this.props.children}
//                 </div>
//             </Content>
//             <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
//         </Layout>