import React from 'react';
import Bar from './Bar';

export default class AudioVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fftSize: 0,
      smoothingTimeConstant: 30,
    };
    props.analyserNode.fftSize = 64;
    props.analyserNode.smoothingTimeConstant = 0.3;
    this.setupVisualizerInterval();
  }

  setupVisualizerInterval = () => {
    const bufferLength = this.props.analyserNode.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    clearInterval(this.interval);

    this.interval = setInterval(() => {
      // Fill the array with information about the volume at various frequencies
      this.props.analyserNode.getFloatFrequencyData(dataArray);
      const state = {}
      for (let i = 0; i < dataArray.length; i++) {
        state[i] = dataArray[i];
      }
      this.setState(state);
    }, 10);
  }

  handleSmoothingTimeConstantChange = (e) => {
    this.setState({ smoothingTimeConstant: e.target.value });
    this.props.analyserNode.smoothingTimeConstant = Number(e.target.value) / 100;
  }

  handleFftSizeChange = (e) => {
    const fftSizePercentage = Number(e.target.value);
    this.setState({ fftSize: e.target.value });

    let fftSize = this.props.analyserNode.fftSize;
    if (fftSizePercentage <= 20) {
      fftSize = 64;
    }
    if (fftSizePercentage > 20 && fftSizePercentage <= 40) {
      fftSize = 128;
    }
    if (fftSizePercentage > 40 && fftSizePercentage <= 60) {
      fftSize = 256;
    }
    if (fftSizePercentage > 60 && fftSizePercentage <= 80) {
      fftSize = 512;
    }
    if (fftSizePercentage > 80 && fftSizePercentage <= 100) {
      fftSize = 1024;
    }
    this.props.analyserNode.fftSize = fftSize;
    return this.setupVisualizerInterval();
  }

  render() {
    const bars = Object.keys(this.state).map(bar => <Bar key={bar} height={this.state[bar]}/>);
    return (
      <div>
        <h1>Audio Visualizer Controls</h1>
        <label htmlFor="smoothing-time-constant">Smoothing Time Constant</label>
        <input id="smoothing-time-constant" type="range" value={this.state.smoothingTimeConstant} onChange={this.handleSmoothingTimeConstantChange} />
        <label htmlFor="fft-size">FFT Size</label>
        <input id="fft-size" type="range" value={this.state.fftSize} onChange={this.handleFftSizeChange} />
        <div style={{ display: 'flex', alignItems: 'flex-end', alignContent: 'flex-end', height: '200px' }}>
          {bars}
        </div>
      </div>
    );
  }
}
