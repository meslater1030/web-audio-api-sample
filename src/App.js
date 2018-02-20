import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
    };
  }

  play = () => {
    // Implement me
  }

  pause = () => {
    // Implement me
  }

  mute = () => {
    // Implement me
  }

  unmute = () => {
    // Implement me
  }

  handleTimeChange = (e) => {
    this.setState({ currentTime: e.target.value });
  }

  handleDurationChange = (e) => {
    // What might this be useful for?
  }

  render() {
    return (
      <div>
        <video
          crossOrigin="anonymous"
          ref={(videoElement) => { this.videoElement = videoElement; }}
          playsInline="false"
          onDurationChange={this.handleDurationChange}
        >
          <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.360p.webm" type="video/webm" crossOrigin="anonymous" />
        </video>
        <div>
          <button onClick={this.play}>
            Play
          </button>
          <button onClick={this.pause}>
            Pause
          </button>
          <button onClick={this.mute}>
            Mute
          </button>
          <button onClick={this.unmute}>
            Unmute
          </button>
          <label htmlFor="time">Current Time</label>
          <input type="range" value={this.state.currentTime} onChange={this.handleTimeChange} />
        </div>
      </div>
    );
  }
}

export default App;
