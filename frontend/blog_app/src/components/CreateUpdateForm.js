import React, { Component } from 'react'
import { Form, Input, Button, Upload } from 'antd';
import axios from 'axios';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};



export default class CustomForm extends Component {

    state = {
        image: null,
        article: {
            article_title: "",
            article_description: ""
        }
    }

    componentDidMount() {

        const articleId = this.props.articleId;

        console.log("articleId");

        if (articleId !== undefined) {
            console.log(articleId);

            axios.get(`http://127.0.0.1:8000/api/post/${articleId}/`)
                .then((res) => {
                    // console.log(res.data.data);
                    const data = {}
                    res.data.data.map((item) => (
                        data.article_title = item.article_title,
                        data.article_description = item.article_description,
                        data.article_image = item.article_image,
                        data.article_id = item.article_id
                    ))
                    // console.log("data");
                    // console.log(data);

                    this.setState({
                        // article: res.data.data
                        article: data
                    })
                })
        }


    }

    handleFormSubmit = (event, requestType, articleId) => {
        console.log("click");

        event.preventDefault();
        const title = this.title.props.value
        const decription = this.decription.props.value
        const image = document.getElementById('image').files[0];
        console.log(title, decription);
        // console.log(this.state.image);

        const form_data = new FormData();
        form_data.append("article_title", title);
        form_data.append("article_description", decription);
        form_data.append("article_image", image);

        if (requestType === "PUT") {
            console.log(requestType);
            axios({
                method: 'POST',
                url: `http://127.0.0.1:8000/api/update/${articleId}/`,
                responseType: 'stream',
                enctype: 'multipart/form-data',
                contentType: false,
                cache: false,
                processData: false,
                data: form_data,
            })
                .then(function (res) {
                    console.log(res.data);
                    window.location.reload()
                })
                .catch(err => console.log(err.message)
                )
        } else {
            axios({
                method: 'POST',
                url: 'http://127.0.0.1:8000/api/addarticle/',
                responseType: 'stream',
                enctype: 'multipart/form-data',
                contentType: false,
                cache: false,
                processData: false,
                data: form_data,
            })
                .then(function (res) {
                    console.log(res.data);
                    window.location.replace("/")
                })
                .catch(err => console.log(err.message)
                )

        }





    }

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ image: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    render() {
        return (
            <div>
                <Form name="nest-messages"  >
                    <Form.Item
                        name="title"
                        label="Title"
                    >
                        <Input name="title" ref={(title) => this.title = title} value={this.state.article.article_title} />
                    </Form.Item>
                    <Form.Item name="decription" label="Decription">
                        <Input.TextArea name="decription" ref={(decription) => this.decription = decription} value={this.state.article.article_description} />
                    </Form.Item>
                    <Input type="file" onChange={this.onImageChange} name="image" id="image" />Add Coder Image

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit" onClick={(event) => this.handleFormSubmit(event, this.props.method, this.props.articleId)}>
                            {this.props.buttonType === 'Update' ? "Update" : "Create"}
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        )
    }
}
