import React from "react";
import HackerNews from "./hacker_news";
import Story from "./story";

class StoryList extends React.Component {
  constructor() {
    super();
    this.state = explosive('state');
    explosive().on('state:change', (state) => this.setState(state));
  }

  componentDidMount() {
    let hn = new HackerNews;

    hn.topStories().then((json) => {
      explosive().setState({stories: json}).ajaxFinished();
    });
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
