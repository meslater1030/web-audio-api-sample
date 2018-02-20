import React from 'react';
import Bar from './Bar';

export default class AudioVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fftSize: 0,
      smoothingTimeConstant: 0,
    };
    props.analyserNode.fftSize = 64;
    props.analyserNode.smoothingTimeConstant = 0.3;
    const bufferLength = props.analyserNode.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    setInterval(() => {
      // Fill the array with information about the volume at various frequencies
      props.analyserNode.getFloatFrequencyData(dataArray);
      const state = {}
      for (let i = 0; i < dataArray.length; i++) {
        state[i] = dataArray[i];
      }
      this.setState(state);
    }, 10);
  }

  handleSmoothingTimeConstantChange = (e) => {
    this.setState({ smoothingTimeConstant: e.target.value });
    // What needs to happen here to alter the time constant?
    // What do you think the time constant actually is?
    // Implement the remainder of this function
  }

  handleFftSizeChange = (e) => {
    this.setState({ fftSize: e.target.value });
    // What needs to happen here to alter the fft size?
    // Implement the remainder of this function
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
        <div style={{ display: 'flex', alignItems: 'flex-end', alignContent: 'flex-end', height: '150px' }}>
          {bars}
        </div>
      </div>
    );
  }
}
