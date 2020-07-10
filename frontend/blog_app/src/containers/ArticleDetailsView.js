import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { Card } from 'antd';
import { Spin, Space } from 'antd';
import CustomForm from '../components/CreateUpdateForm';
const { Meta } = Card;


export default class ArticleDetails extends Component {

    state = {
        article: null
    }

    componentDidMount() {
        const articleId = this.props.match.params.articleId;


        Axios.get(`http://127.0.0.1:8000/api/post/${articleId}/`)
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

    render() {
        // console.log("this.state.article");
        // console.log( this.state.article);

        if (this.state.article === null){
            return (
                <div className="example">
                    <Spin size="large"/>
                </div>
            )
        }else{

        return (
            // <div className="site-card-border-less-wrapper">
            <React.Fragment>
            <Card
                // hoverable
                // style={{ width: 240 }}
                cover={<img alt="example" src={"http://127.0.0.1:8000/media/" + this.state.article.article_image} width={500} height={450} />}
            >
                <Meta title={this.state.article.article_title} description={this.state.article.article_description} />
            </Card>
            {/* <h1><Link to={`/post/update/${this.state.article.article_id}`}>Update Post</Link></h1> */}
            <CustomForm articleId={this.state.article.article_id} method="PUT" buttonType="Update"/>
            </React.Fragment>
        )}
    }
}
