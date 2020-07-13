import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Spin, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions/Auth'

class Signup extends Component {

    state = {
        redirect: false
    }

    handleSignin = ()=>{
        const username = this.username.props.value
        const password = this.password.props.value

        this.props.onAuth(username,password)
        // this.props.history.push("/")
        // this.setState({ redirect: true })
        // return( <Redirect to="/" />)
        // console.log(username, password);
        // return( <Redirect to="/" />)
    }

    render() {
        let errMessage = null
        if (this.props.error){
            errMessage = (
                <p>{this.props.error}</p>
            )
            // console.log(errMessage);
        }
        console.log(this.props.error);
        return (
            <div>
            {errMessage}
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    // onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" ref={(username) => { this.username = username }}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            ref={(password) => { this.password = password }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        {
                            this.props.loading ?
                            <div className="example">
                                <Spin size="large"/>
                             </div>
                             :
                             <>
                             <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSignin}>
                                Log in
                            </Button>
                            Or <NavLink to='/signup'>register now!</NavLink>
                            </>
                        }
                        
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        loading: state.loading,
        error : state.error
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onAuth : (username, password)=>{dispatch(actions.authLogin(username, password))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)