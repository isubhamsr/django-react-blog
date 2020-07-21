import React, { Component } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export default class Search extends Component {

    state = {
        data: [],
        isLoading: false,
        err: ""
    }

    componentWillReceiveProps() {
        this.setState({
            isLoading: true
        })

        Axios.post('http://127.0.0.1:8000/api/search/', { query: this.props.data })
            .then((res) => {
                console.log(res.data);
                this.setState({
                    data: res.data.data,
                    isLoading: false,
                    err: res.data.err,
                    message: res.data.message
                })
            })
            .catch(err=>{
                this.setState({
                    err: err.message
                })
            })
    }

    render() {
        return (
            <div className="container">
            {
                this.state.err === "true" ? 
                <h1>{this.state.message}</h1>
                :

                <div class="post-preview my-4">
                    {this.state.data.map((item) => (
                        <>
                            {/* <div class="post-preview my-4"> */}
                            {/* <Link to={`/post/${item.article_id}`}> */}
                            <Link to={`/post/${item.slug}`} target="_blank">
                                <img src={"http://127.0.0.1:8000/media/" + item.article_image} class="rounded float-left mx-3" alt="ok" width={250} height={130} />
                                <h2 class="post-title">
                                    {item.article_title}
                                </h2>
                                <p class="post-subtitle" style={{ color: "gray" }}>
                                    {`${item.short_description.slice(0, 250)}...`}

                                </p>
                            </Link>
                            <p class="post-meta">Posted by
            <a href="#" target="_blank"> Subham </a>
            on September 24, 2019</p>
                            {/* </div> */}
                            <hr class="my-4" />
                        </>
                    ))}
            </div>
            }
            </div>  
                
        )
    }
}
