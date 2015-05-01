import reqwest from "reqwest";

const APIROOT = "https://hacker-news.firebaseio.com/v0/";

function get(url) {
  return new Promise((resolve, reject) => {
    reqwest({
      url: url,
      type: 'json',
      success: resolve,
      error: reject
    })
  });
}

export default class HackerNews {
  getItem(id) {
    return get(APIROOT + `item/${id}.json`);
  }

  getStoryList(endpoint, limit = 10) {
    return get(APIROOT + endpoint).then((items) => {
      let limited = items.slice(0, limit);

      return Promise.all(limited.map((id) => this.getItem(id)));
    });
  }

  topStories(limit = 10) {
    return this.getStoryList('topstories.json');
  }

  newStories(limit = 10) {
    return this.getStoryList('newstories.json');
  }
}
