import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Comments from './Comments';

export default class Articles extends Component {

  state = {
    visible: 5,
  }

  loadMore = () => {
    this.setState((prev) => {
      return { visible: prev.visible + 5 };
    });
  }

  render() {
    return (
      <div class="post-preview my-4">
        {this.props.data.slice(0, this.state.visible).map((item) => (
          <>
            <Link to={`/post/${item.slug}`}>
              <img src={"http://127.0.0.1:8000/media/" + item.article_image} class="rounded float-left mx-3" alt="ok" width={250} height={130} />
              <h2 class="post-title">
                {item.article_title}
              </h2>
              <p class="post-subtitle" style={{ color: "gray" }}>
                {`${item.short_description.slice(0, 250)}...`}

              </p>
            </Link>
            <p class="post-meta">Posted by
            <a href="#" target="_blank"><b>  {item.author}  </b></a>
            on <strong>{item.created_at.slice(0, 10).split("-").reverse().join("-")}</strong></p>
            {/* </div> */}
            <hr class="my-4" />
          </>
        ))}
        {this.state.visible < this.props.data.length &&
          <button onClick={this.loadMore} type="button" className="load-more">Load more</button>
        }
      </div>

    )
  }
}

// {this.state.items.slice(0, this.state.visible).map((item, index) => {
//   return (
//     <div className="tile fade-in" key={item.id}>
//       <span className="count">{index+1}</span>
//       <h2>{item.title}</h2>
//       <p>{item.body}</p>
//     </div>
//   );
// })}
// </div>
// {this.state.visible < this.state.items.length &&
//  <button onClick={this.loadMore} type="button" className="load-more">Load more</button>
// }

// loadMore() {
//   this.setState((prev) => {
//     return {visible: prev.visible + 4};
//   });
// }
