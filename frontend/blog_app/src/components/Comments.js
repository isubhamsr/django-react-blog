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
        error: false,
        message: "Add Your Comments",
        input: ""
    }

    componentDidMount() {

        axios.get('http://127.0.0.1:8000/api/fetchcomments/')
            .then((res) => {
                if (res.data.err === 'true') {
                    // alert(res.data.message)
                    this.setState({ message: res.data.message, error: true })
                } else {
                    console.log(res.data.data);
                    this.setState({ comment: res.data.data, isLoading: false })
                }

            })
            .catch(error => {
                this.setState({
                    message: error.message,
                    error: true
                })
            })


    }

    componentDidUpdate() {

        axios.get('http://127.0.0.1:8000/api/fetchcomments/')
            .then((res) => {
                if (res.data.err === 'true') {
                    // alert(res.data.message)
                    this.setState({ message: res.data.message, error: true })
                } else {
                    this.setState({ comment: res.data.data, isLoading: false })
                }

            })
            .catch(error => {
                this.setState({
                    message: error.message,
                    error: true
                })
            })

    }

    handleComment = () => {
        const comment = this.state.input

        this.setState({
            input: "",
            isLoading: true,
            disable: true,
        });

        axios.post('http://127.0.0.1:8000/api/addcomment/', {
            comment: comment
        })
            .then(res => {
                if (res.data.err === 'true') {
                    // alert(res.data.message)
                    this.setState({ message: res.data.message, error: true })
                } else {
                    this.setState({ message: res.data.message, isLoading: false })
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
        const { disable } = this.state.disable
        return (

            <div>
                {/* {this.state.input} */}
                {/* <h4>{item.comment}</h4> */}
                <div className="my-4">
                    {this.state.comment.map((item) => (
                        <div class="comment_block">
                            <div class="new_comment">
                                <ul class="user_comment">
                                    <div class="user_avatar">
                                        <img src="https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/73.jpg" className="commentImg" />
                                    </div>
                                    <div class="comment_body">
                                        <p className="comments">{item.comment}</p>
                                    </div>
                                    <div class="comment_toolbar">
                                        <div class="comment_details">
                                            {/* <ul>
                                                <li><i class="fa fa-clock-o"></i> 13:94</li>
                                                <li><i class="fa fa-calendar"></i> 04/01/2015</li>
                                                <li><i class="fa fa-pencil"></i> <span class="user">John Smith</span></li>
                                            </ul> */}
                                        </div>
                                        <div class="comment_tools">
                                            <ul>
                                                <li><i class="fa fa-share-alt"></i></li>
                                                <li><i class="fa fa-reply"></i></li>
                                                <li><i class="fa fa-heart love"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="my-4">
                    <Form name="nest-messages"  >
                        <Form.Item name="comment" class="create_new_comment">
                            <div class="user_avatar">
                                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/BillSKenney/73.jpg" />
                            </div>
                            <div class="input_comment">
                                <input type="text" placeholder="Add Your Comment" className="commentText"
                                    ref={(comment) => this.comment = comment} value={this.state.input} onChange={this.handleChange}
                                />
                            </div>
                            {/* <Input.TextArea name="comment" ref={(comment) => this.comment = comment} value={this.state.input} onChange={this.handleChange} /> */}
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




