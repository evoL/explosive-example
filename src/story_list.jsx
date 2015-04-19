import React from "react";
import reqwest from "reqwest";
import Story from "./story";

class StoryList extends React.Component {
  constructor() {
    super();
    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    let onSuccess = function(json) {
      this.setState({stories: json});
      window.explosive('ajaxFinished');
    };

    reqwest({
      url: "https://fierce-gorge-1132.herokuapp.com/stories",
      type: 'json'
    }).then((json) => onSuccess.call(this, json));
  }

  render() {
    let storyNodes = this.state.stories.map((story) =>
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
