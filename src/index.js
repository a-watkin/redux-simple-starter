import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
import YOUTUBE_KEY from "../API_KEY";
import YTSearch from "youtube-api-search";
// import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

console.log(YOUTUBE_KEY);
const API_KEY = YOUTUBE_KEY;

// Create a new component that produces HTML
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch("Penguins");
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    // limits the function to once every 300ms
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        {/* passing props to VideoList */}
        <VideoList
          // updates index.js app state with selected video
          // you can do it liks this as both are using the same name
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// put the component in the dom
ReactDOM.render(<App />, document.querySelector(".container"));
