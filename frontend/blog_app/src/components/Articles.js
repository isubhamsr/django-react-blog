import React from 'react'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

export default function Articles(props) {
    console.log("form articles");
    console.log(props.data);
    
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={props.data}
    //         footer={
    //             <div>
    //                 <b>ant design</b> footer part
    //   </div>
    //         }
            renderItem={item => (
                
                <List.Item
                    key={item.article_title}
                    actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                        
                        <img
                            width={272}
                            alt="logo"
                            src= {"http://127.0.0.1:8000/media/"+item.article_image}
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.article_title}</a>}
                        description={item.article_description}
                    />
                    {item.article_description}
                </List.Item>
            )}
        />
    )
}
