import React from "react";
import StoriesPage from "./stories_page";
import {explosive} from "./explosive";

if (typeof window.explosive === "undefined") {
  window.explosive = explosive;
}

React.render(
  <StoriesPage />,
  document.getElementById('App')
);

