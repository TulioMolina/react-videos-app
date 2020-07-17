import React from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

const KEY = "AIzaSyBLH8G9n5j4m0oSz2jY_5j0-0ico2pxJbM";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  };

  componentDidMount() {
    this.onTermSubmit("React.js");
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  onTermSubmit = async (term) => {
    console.log(term);
    const response = await youtube.get("/search", {
      params: {
        q: term,
        maxResults: 5,
        part: "snippet",
        key: KEY,
      },
    });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onTermSubmitApp={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                videos={this.state.videos}
                onVideoSelect={this.onVideoSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
