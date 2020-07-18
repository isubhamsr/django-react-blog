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
        articles : [],
        dateTime : []
    }

    componentDidMount(){
        Axios.get('http://127.0.0.1:8000/api/allpost/')
        .then((res)=>{
            console.log(res.data.message);
            const timeAndDateArr = []
            res.data.data.map((item)=>{

                let a = item.created_at
                let date_time = a.split("T")

                let date = date_time[0].split("-")
                let year = date[0]
                let month = date[1]
                let day = date[2]

                date = `${day}-${month}-${year}`
                var H = +date_time[1].substr(0, 2);
                var h = H % 12 || 12;
                var ampm = (H < 12 || H === 24) ? "AM" : "PM";
                var timeString = h + date_time[1].substr(2, 3) + ampm;

                let obj = {
                    time: timeString,
                    date: date
                }

                timeAndDateArr.push(obj)

            })

            console.log(timeAndDateArr);


            this.setState({
                articles : res.data.data,
                dateTime : timeAndDateArr
            })
        })
    }

    render() {
        return (
            <>
            {this.state.articles ?
            
            <Articles data={this.state.articles} datetime = {this.state.dateTime}/>
            :
            <div>
                <h1>No Posts Found</h1>
            </div>
            }
            </>
        )
    }
}
