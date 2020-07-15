import React, { Component } from 'react'
import Articles from '../components/Articles';
import Axios from 'axios';

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}


export default class ArticleListView extends Component {

    state = {
        articles : []
    }

    componentDidMount(){
        Axios.get('http://127.0.0.1:8000/api/allpost/')
        .then((res)=>{
            console.log(res.data.message);
            this.setState({
                articles : res.data.data
            })
        })
    }

    render() {
        return (
            <>
            {this.state.articles ?
            
            <Articles data={this.state.articles}/>
            :
            <div>
                <h1>No Posts Found</h1>
            </div>
            }
            </>
        )
    }
}
