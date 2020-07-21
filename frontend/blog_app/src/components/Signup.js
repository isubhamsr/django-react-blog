import React, { Component } from 'react'
import {
    Form,
    Input,
    Button,
    Spin
} from 'antd';
import { LoadingOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom'
import * as actions from '../store/actions/Auth'
import { connect } from 'react-redux'

// const { Option } = Select;
// const AutoCompleteOption = AutoComplete.Option;

class Singnup extends Component {

    state = {
        redirect : false
    }

    componentDidMount(){
        const token = localStorage.getItem('token');

        if (token !== null){
            this.setState({ redirect: true })
        }
    }

    handleSignup = () =>{
        const first_name = this.first_name.props.value
        const last_name = this.last_name.props.value
        const username = this.username.props.value
        const email = this.email.props.value
        const password = this.password1.props.value
        const phone = this.phone.props.value

        console.log(first_name, last_name, username, email, password, phone);
        this.props.onSignup(first_name, last_name, email, username, password, phone)
        this.props.history.push("/")
    }

    render() {

        const { redirect } = this.state

        if (redirect) {
            return <Redirect to="/" />
        }

        let errMessage = null
        if (this.props.error){
            errMessage = (
                <p>{this.props.error}</p>
            )
        }
        console.log(this.props.error);
        return (
            <div className="py-4">
            {errMessage}
                <Form
                    // form={form}
                    name="register"
                    // onFinish={onFinish}
                    initialValues={{
                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                        prefix: '86',
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="First Name"
                        label={
                            <span>
                                First Name&nbsp;
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input name="first_name" ref={(first_name) => { this.first_name = first_name }}/>
                    </Form.Item>

                    <Form.Item
                        name="Last Name"
                        label={
                            <span>
                                Last Name&nbsp;
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input name="last_name" ref={(last_name) => { this.last_name = last_name }}/>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input name="email" ref={(email) => { this.email = email }}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password 
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        name="password1" ref={(password1) => { this.password1 = password1 }}/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password 
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        name="password2" ref={(password2) => { this.password1 = password2 }}/>
                    </Form.Item>

                    <Form.Item
                        name="username"
                        label={
                            <span>
                                Username&nbsp;
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} name="username" ref={(username) => { this.username = username }}/>
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            // addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                            name="phone" ref={(phone) => { this.phone = phone }}
                        />
                    </Form.Item>

                    <Form.Item >
                    {
                        this.props.loading ?
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                        :
                        <Button type="primary" htmlType="submit" onClick={this.handleSignup}>
                            Register
                        </Button>
                    }
                        
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        error : state.error,
        loading : state.loading
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onSignup : (first_name, last_name, email, username, password, phone)=>{dispatch(actions.authSignup(first_name, last_name, email, username, password, phone))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Singnup)