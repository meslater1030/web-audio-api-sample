import React, { Component } from 'react';
import PauseCircleOutline from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Typeography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import AudioVisualizer from './AudioVisualizer';
import Keyboard from './Keyboard';
import './App.css';
import SimpleAppBar from './components/SimpleAppBar';
import ContentWrapper from './components/ContentWrapper';
import AccordionMenu from './components/AccordionMenu';
import ColumnWrapper from './components/ColumnWrapper';
import RowWrapper from './components/RowWrapper';
import VisualizerCode from './components/VisualizerCode';
import VideoCodeExample from './components/VideoCodeExample';
import ConvolverCodeExample from './components/ConvolverCodeExample';
import PanningCodeExample from './components/PanningCodeExample';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      paused: true,
      muted: false,
      volume: 100,
      convolverOn: false,
      pan: 50,
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

  handleTimeChange = (e, value) => {
    const currentTime = this.videoDuration * Number(value) / 100;
    this.setState({ currentTime: value });
    if (this.videoDuration && this.videoDuration !== Infinity) {
      this.videoElement.currentTime = currentTime;
    }
  }

  handleDurationChange = (e) => {
    this.videoDuration = this.videoElement.duration;
  }

  getUserMedia = () => {
    return navigator.mediaDevices.getUserMedia({ audio: true });
  }

  setupVideoElement = (videoElement) => {
    this.videoElement = videoElement;
    this.setupConvolverNode()
      .then((buffer) => Promise.all([buffer, this.getUserMedia()]))
      .then(([buffer, audioStream]) => {
        this.convolverNode = this.audioContext.createConvolver();
        this.convolverNode.buffer = buffer;
        // this.sourceNode = this.audioContext.createMediaStreamSource(audioStream);
        this.sourceNode = this.audioContext.createMediaElementSource(videoElement);
        this.gainNode = this.audioContext.createGain();
        this.pannerNode = this.audioContext.createStereoPanner();
        this.pannerNode.pan.value = 0.5;
        this.oscillatorNode = this.audioContext.createOscillator();
        this.oscillatorNode.start();
        this.mergerNode = this.audioContext.createChannelMerger();
        this.sourceNode.connect(this.mergerNode);
        this.mergerNode.connect(this.gainNode);
        this.gainNode.connect(this.pannerNode);
        this.pannerNode.connect(this.audioContext.destination);

        this.analyserNode = this.audioContext.createAnalyser();
        this.pannerNode.connect(this.analyserNode);
        this.forceUpdate();
      });
  }

  setupConvolverNode = () => {
    return new Promise((resolve, reject) => {
      const ajaxRequest = new XMLHttpRequest();
      ajaxRequest.open('GET', 'https://d1490khl9dq1ow.cloudfront.net/sfx/mp3preview/stab-static-frequency-warp_zJIVQYV_.mp3', true);
      ajaxRequest.responseType = 'arraybuffer';
      ajaxRequest.onload = () => this.audioContext.decodeAudioData(ajaxRequest.response, resolve, reject);
      ajaxRequest.send();
    });
  }

  handleVolumeChange = (e, value) => {
    this.gainNode.gain.value = Number(value) / 100;
    this.setState({ volume: value });
  }

  handlePanningChange = (e, value) => {
    this.setState({ pan: value });
    this.pannerNode.pan.value = Number(value) / 100;
  }

  handleConvolverChange = () => {
    const convolverOn = !this.state.convolverOn;
    this.setState({ convolverOn });
    this.sourceNode.disconnect();
    this.gainNode.disconnect();
    this.convolverNode.disconnect();
    this.analyserNode.disconnect();
    this.pannerNode.disconnect();
    this.mergerNode.disconnect();
    if (convolverOn) {
      // Check this out!
      this.sourceNode.connect(this.mergerNode);
      this.mergerNode.connect(this.convolverNode);
      this.convolverNode.connect(this.gainNode);
      this.gainNode.connect(this.pannerNode);
      this.pannerNode.connect(this.audioContext.destination);
      this.pannerNode.connect(this.analyserNode);
    } else {
      this.sourceNode.connect(this.mergerNode);
      this.mergerNode.connect(this.gainNode);
      this.gainNode.connect(this.pannerNode);
      this.pannerNode.connect(this.audioContext.destination);
      this.pannerNode.connect(this.analyserNode);
    }
  }

  playNote = (frequency) => {
    this.oscillatorNode.frequency.value = frequency;
    this.oscillatorNode.connect(this.mergerNode);
  }

  stopPlaying = () => {
    this.oscillatorNode.disconnect();
  }

  handleTimeUpdate = () => {
    this.setState({ currentTime: this.videoElement.currentTime / this.videoDuration * 100 });
  }

  render() {
    return (
      <div>
        <SimpleAppBar appTitle="Exploring the Native JS Web Audio API" />
        <ContentWrapper>
          <RowWrapper>
            <ColumnWrapper>
                <video
                  crossOrigin="anonymous"
                  ref={this.setupVideoElement}
                  onDurationChange={this.handleDurationChange}
                  onTimeUpdate={this.handleTimeUpdate}
                >
                  <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.360p.webm" type="video/webm" crossOrigin="anonymous" />
                </video>
              <div>
                <Slider value={this.state.currentTime} aria-labelledby="time" onChange={this.handleTimeChange} />
                <div style={{ display: 'flex' }}>
                  <IconButton onClick={this.playPause}>
                    {this.state.paused ? <PlayCircleOutline /> : <PauseCircleOutline />}
                  </IconButton>
                  <IconButton onClick={this.muteUnmute}>
                    {this.state.muted ? <VolumeUp /> : <VolumeOff />}
                  </IconButton>
                  { !this.state.muted &&  <Slider value={this.state.volume} onChange={this.handleVolumeChange} />  }
                </div>            
              </div>
              <RowWrapper>
                <VideoCodeExample />
              </RowWrapper>
            </ColumnWrapper>
            <ColumnWrapper>
              <AccordionMenu
                audioVisualizerDemo={this.analyserNode &&
                  <div>
                    <AudioVisualizer audioContext={this.audioContext} analyserNode={this.analyserNode} />
                    <VisualizerCode />
                  </div>
                }
                convolverControls={
                  <div style={{ width: '500px', textAlign: 'center' }}>
                    <Typeography>Convolver</Typeography>
                    <Switch checked={this.state.convolverOn} onChange={this.handleConvolverChange} />
                    <ConvolverCodeExample />
                  </div>
                }
                panningControls={
                  <div style={{ width: '500px' }}>
                    <Typeography id="panner">Panner</Typeography>
                    <Slider aria-labelledby="panner" value={this.state.pan} onChange={this.handlePanningChange} />
                    <PanningCodeExample />
                  </div>
                }
                oscillationControls={<Keyboard playNote={this.playNote} stopPlaying={this.stopPlaying} />}
              />
            </ColumnWrapper>
          </RowWrapper>
        </ContentWrapper>
      </div>
    );
  }
}

export default App;
