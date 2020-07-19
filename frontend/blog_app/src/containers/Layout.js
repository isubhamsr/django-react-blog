import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Redirect, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions/Auth'
import Search from '../components/Search';
const { Header, Content, Footer } = Layout;



class CustomLayout extends Component {

    state = {
        redirect: false,
        value: "",
        isLoading: false
    }

    handleLogout = () => {
        this.props.onLogout()
        this.setState({ redirect: false })
        return (<Redirect to="/signin" />)
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
            isLoading: true,
        });
    }

    handleSubmit = () => {
        // event.preventDefault();
        // alert('A name was submitted: ' + this.state.value);
        
        this.props.onSearch(this.state.value)
        this.setState({ redirect: true })
        // this.props.history.push("/search/")
    }

    changeState = () =>{
        this.setState({ redirect: false })
    }

    render() {
        return (
            <body class="d-flex flex-column">

                <header>
                    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                        <div class="container-fluid">
                            <Link class="navbar-brand" to="/" onClick={this.changeState}>Coding School</Link>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarCollapse">
                                <ul class="navbar-nav mr-auto mb-2 mb-md-0">
                                    <li class="nav-item active">
                                        <Link class="nav-link" aria-current="page" to="/" onClick={this.changeState}>Home</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/about" onClick={this.changeState}>About</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link " to="/contact" tabindex="-1" onClick={this.changeState}>Contact</Link>
                                    </li>
                                </ul>
                                <div class="d-flex" >
                                    <input class="form-control mr-2" placeholder="Search" value={this.state.value} onChange={this.handleChange} />
                                    {
                                            
                                        this.state.isLoading ?
                                        <Link to={`/search/${this.state.value}`}>
                                            <button onClick={this.handleSubmit} class="btn btn-outline-success">
                                                Search
                                            </button>          
                                            </Link>                
                                            :
                                            <button class="btn btn-outline-success" aria-disabled="true" >Search</button>
                                    }
                                </div>
                                {
                                    this.props.idAuthenticated ?

                                        <button class="btn btn-outline-success m-2" onClick={this.handleLogout}>Log Out</button>

                                        :
                                        <Link to="/signin" class="btn btn-outline-success m-2" onClick={this.changeState}>Sign In</Link>
                                }
                            </div>
                        </div>
                    </nav>
                </header>

                <main class="flex-shrink-0 ">
                    <div class="container">
                    {
                        this.state.redirect ? 
                        <Search data={this.state.value}/>
                        :
                        this.props.children

                    }
                    </div>
                </main>

                <footer class="footer">
                    <div class="container">
                        <span class="text-muted">&copy; 20202 codingschool.com</span>
                    </div>
                </footer>
            </body>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        err: state.err,
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(actions.authLogout()) },
        onSearch: (query) => { dispatch(actions.search(query)) },
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