import React, { Component } from 'react';
import AudioVisualizer from './AudioVisualizer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      paused: true,
      muted: false,
      volume: '100',
    };

    this.audioContext = new AudioContext();
  }

  playPause = () => {
    this.setState({ paused: !this.state.paused });
    if (this.state.paused) {
      this.videoElement.play();
    } else {
      this.videoElement.pause();
    }
  }

  muteUnmute = () => {
    this.setState({ muted: !this.state.muted });
    this.videoElement.muted = !this.videoElement.muted;
  }

  handleTimeChange = (e) => {
    this.setState({ currentTime: e.target.value });
    if (this.videoDuration && this.videoDuration !== Infinity) {
      this.videoElement.currentTime = this.videoDuration * Number(e.target.value) / 100;
    }
  }

  handleDurationChange = (e) => {
    this.videoDuration = this.videoElement.duration;
  }

  setupVideoElement = (videoElement) => {
    this.videoElement = videoElement;
    this.sourceNode = this.audioContext.createMediaElementSource(videoElement);
    this.gainNode = this.audioContext.createGain();
    this.sourceNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);

    // Check this out!
    this.analyserNode = this.audioContext.createAnalyser();
    this.gainNode.connect(this.analyserNode);
    this.forceUpdate();
  }

  handleVolumeChange = (e) => {
    this.gainNode.gain.value = Number(e.target.value) / 100;
    this.setState({ volume: e.target.value });
  }

  render() {
    return (
      <div>
        <video
          crossOrigin="anonymous"
          ref={this.setupVideoElement}
          onDurationChange={this.handleDurationChange}
        >
          <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.360p.webm" type="video/webm" crossOrigin="anonymous" />
        </video>
        <div>
          <button onClick={this.playPause}>
            {this.state.paused ? 'Play' : 'Pause'}
          </button>
          <button onClick={this.muteUnmute}>
            {this.state.muted ? 'Unmute' : 'Mute'}
          </button>
          <label htmlFor="time">Current Time</label>
          <input id="time" type="range" value={this.state.currentTime} onChange={this.handleTimeChange} />
          <label htmlFor="volume">Volume</label>
          <input id="volume" type="range" value={this.state.volume} onChange={this.handleVolumeChange} />
        </div>
        { this.analyserNode &&
          <AudioVisualizer audioContext={this.audioContext} analyserNode={this.analyserNode} />
        }
      </div>
    );
  }
}

export default App;
