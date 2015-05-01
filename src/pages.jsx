import React from "react";
import StoryList from "./story_list";

export class TopStories extends React.Component {
  render() {
    return <StoryList endpoint="topStories" />;
  }
};

export class NewStories extends React.Component {
  render() {
    return <StoryList endpoint="newStories" />;
  }
};
