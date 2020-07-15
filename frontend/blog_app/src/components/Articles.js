// import React from 'react'
// import { List, Avatar, Space } from 'antd';
// import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom'

// const IconText = ({ icon, text }) => (
//     <Space>
//         {React.createElement(icon)}
//         {text}
//     </Space>
// );

// export default function Articles(props) {
//     console.log("form articles");
//     console.log(props.data);

//     return (
//         <List
//             itemLayout="vertical"
//             size="large"
//             pagination={{
//                 onChange: page => {
//                     console.log(page);
//                 },
//                 pageSize: 5,
//             }}
//             dataSource={props.data}
//             //         footer={
//             //             <div>
//             //                 <b>ant design</b> footer part
//             //   </div>
//             //         }
//             renderItem={item => (

//                 <List.Item
//                     key={item.article_title}
//                     actions={[
//                         <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
//                         <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
//                         <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
//                     ]}
//                     extra={

//                         <img
//                             width={250}
//                             height={150}
//                             alt="logo"
//                             src={"http://127.0.0.1:8000/media/" + item.article_image}
//                         />
//                     }
//                 >
//                     <List.Item.Meta
//                         avatar={<Avatar src={item.avatar} />}
//                         title={<Link to={`/post/${item.article_id}`}>{item.article_title}</Link>}
//                         description={item.article_description.slice(0, 50)}
//                     />
//                     {`${item.article_description.slice(0, 670)}...`}
//                 </List.Item>
//             )}
//         />
//     )
// }

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Articles extends Component {

    render() {
        return (
          <div class="post-preview my-4">
          {this.props.data.map((item)=>(
            <>
            {/* <div class="post-preview my-4"> */}
          <Link to={`/post/${item.article_id}`}>
          <img src={"http://127.0.0.1:8000/media/" + item.article_image} class="rounded float-left mx-3" alt="ok" width={250} height={130} />
            <h2 class="post-title">
            {item.article_title}
            </h2>
            <p class="post-subtitle" style={{color: "gray"}}>
              {`${item.article_description.slice(0, 250)}...`}
            </p>
          </Link>
          <p class="post-meta">Posted by
            <a href="#" target="_blank"> Subham </a>
            on September 24, 2019</p>
        {/* </div> */}
        <hr class="my-4"/>
        </>
          ))}
            </div>
          
        )
    }
}


// {this.props.data.map((item)=>(
//   <ul class="list-unstyled">
//     <li class="media">
//         <img class="mr-3"  src={"http://127.0.0.1:8000/media/" + item.article_image} alt="Generic placeholder image" width="250px" height="150px"/>
//             <div class="media-body">
//                 <h3 class="mt-0 mb-1">{item.article_title}</h3>
// <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
// </div>
// </li>
// </ul>
// ))}
