import React from "react";
import Story from "./story";

class StoryList extends React.Component {
  render() {
    let storyNodes = this.props.stories.map((story) =>
      <Story
        key={story.id}
        title={story.title}
        score={story.score}
        url={story.url}
      />
    );

    return (
      <div className="story-list">{storyNodes}</div>
    );
  }
}

export default StoryList;
