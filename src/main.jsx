import React from "react";
import StoriesPage from "./stories_page";
import {explosive as x} from "./explosive";

if (typeof window.explosive === "undefined") {
  window.explosive = x;
}

React.render(
  <StoriesPage />,
  document.getElementById('App')
);
