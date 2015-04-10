import React from "react";

class Story extends React.Component {
  render() {
    return (
      <article className="story">
        <div className="story__score">{this.props.score}</div>
        <h1 className="story__title">
          <a href={this.props.url}>{this.props.title}</a>
        </h1>
      </article>
    );
  }
}

export default Story;
