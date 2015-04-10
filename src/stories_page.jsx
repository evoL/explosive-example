import React from "react";
import StoryList from "./story_list";

class StoriesPage extends React.Component {
  render() {
    return (
      <div className="page page--stories">
        <h1 className="page__title">Story List</h1>
        <StoryList stories={this.props.store.stories} />
      </div>
    );
  }
};

export default StoriesPage;
