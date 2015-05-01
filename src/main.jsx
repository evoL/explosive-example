import React from "react";
import Router from "react-router";
import {Route, DefaultRoute, RouteHandler, Link, Redirect} from "react-router";

import {TopStories, NewStories} from "./pages";

import {explosive as x} from "./explosive";

if (typeof window.explosive === "undefined") {
  window.explosive = x;
}

class App extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="menu">
          <Link to="top" className="menu__link" activeClassName="is-active">Top Stories</Link>
          <Link to="new" className="menu__link" activeClassName="is-active">New Stories</Link>
        </div>
        <RouteHandler />
      </div>
    );
  }
}

let routes = (
  <Route handler={App}>
    <Route name="top" handler={TopStories} />
    <Route name="new" handler={NewStories} />

    <Redirect from="/" to="top" />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  // Trigger an error
  if (!state.routes.length) {
    throw new Error(`No route matches path '${state.path}'.`);
  }

  React.render(<Handler />, document.getElementById('App'));
});
