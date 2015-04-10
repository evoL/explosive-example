import React from "react";
import StoriesPage from "./stories_page";

let store = {
  stories: [
    {
      "created_at": "2015-02-20T11:13:14.000Z",
      "id": 2,
      "score": 1,
      "title": "Scala.js no longer experimental",
      "updated_at": "2015-02-21T00:41:21.990Z",
      "url": "http://scala-lang.org/news/2015/02/05/scala-js-no-longer-experimental.html"
    },
    {
      "created_at": "2015-02-20T12:14:15.000Z",
      "id": 3,
      "score": 0,
      "title": "A new paper claims that evolution has stopped in a bacterial species. Is it true?",
      "updated_at": "2015-02-20T12:14:15.000Z",
      "url": "https://whyevolutionistrue.wordpress.com/2015/02/04/a-new-paper-claims-that-evolution-has-stopped-in-a-bacterial-species-is-it-true/"
    }
  ]
};

React.render(
  <StoriesPage store={store} />,
  document.getElementById('App')
);
