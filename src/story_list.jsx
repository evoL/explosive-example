import React from "react";
import HackerNews from "./hacker_news";
import Story from "./story";

class StoryList extends React.Component {
  constructor() {
    super();
    this.state = explosive('state');
    explosive().on('state:change', this.setState, this);
  }

  componentWillMount() {
    let hn = new HackerNews;

    hn[this.props.endpoint]().then((json) => {
      explosive().set({stories: json}).loadFinished();
    });
  }

  componentWillUnmount() {
    explosive().removeListener('state:change', this.setState, this);
  }

  render() {
    let storyNodes = (this.state.stories || []).map((story) =>
      <Story
        key={story.id}
        title={story.title}
        score={story.score}
        url={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
      />
    );

    return (
      <div className="story-list">{storyNodes}</div>
    );
  }
}

export default StoryList;
