import React, { Component } from 'react'

import { Form, Input, Button, Upload, Spin } from 'antd';
import axios from 'axios';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

export default class Comments extends Component {

    state = {
        comment: [],
        isLoading: false,
        disable: true,
        error : false,
        message: "Add Your Comments",
        input: ""
    }

    componentDidMount() {

        axios.get('http://127.0.0.1:8000/api/fetchcomments/')
            .then((res) => {
                if (res.data.err === 'true') {
                    // alert(res.data.message)
                    this.setState({message: res.data.message, error: true})
                } else {
                    console.log(res.data.data);
                    this.setState({comment: res.data.data, isLoading: false})
                }

            })
            .catch(error=>{
                this.setState({
                    message: error.message,
                    error: true
                })
            })


    }

    componentDidUpdate(){

        axios.get('http://127.0.0.1:8000/api/fetchcomments/')
            .then((res) => {
                if (res.data.err === 'true') {
                    // alert(res.data.message)
                    this.setState({message: res.data.message, error: true})
                } else {
                    console.log(res.data.data);
                    this.setState({comment: res.data.data, isLoading: false})
                }

            })
            .catch(error=>{
                this.setState({
                    message: error.message,
                    error: true
                })
            })

    }

    handleComment = () => {
        const comment = this.comment.props.value
        console.log(comment);

        this.setState({
            input: null,
            isLoading: true,
        });

        axios.post('http://127.0.0.1:8000/api/addcomment/', {
            comment: comment
        })
            .then(res => {
                if (res.data.err === 'true') {
                    // alert(res.data.message)
                    this.setState({message: res.data.message, error: true})
                } else {
                    this.setState({message: res.data.message, isLoading: false})
                }

            })
            .catch(error => {
                this.setState({
                    message: error.message,
                    error: true
                })
            })
    }

    handleChange = (event) => {
        this.setState({
            disable: false,
            input: event.target.value
        });
    }


    render() {
        console.log(this.state.comment);
        const { disable } = this.state.disable
        return (

            <div>
            {/* {this.state.input} */}
                <div className="my-4">
                    {this.state.comment.map((item)=>(
                        <h4>{item.comment}</h4>
                    ))}
                </div>
                <div className="my-4">
                    <Form name="nest-messages"  >
                        <Form.Item name="comment" label="Comment">
                            <Input.TextArea name="comment" ref={(comment) => this.comment = comment} value={this.state.input} onChange={this.handleChange} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            {
                                this.state.isLoading ?
                                        <Spin />
                                    :
                                    <Button type="primary" htmlType="submit" disabled={this.state.disable} loading={disable} onClick={this.handleComment}>
                                        Add
                                    </Button>
                            }
                        </Form.Item>

                    </Form>
                </div>
            </div>
        )
    }
}
