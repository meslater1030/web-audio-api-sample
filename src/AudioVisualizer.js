import React from 'react';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Bar from './Bar';

export default class AudioVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fftSize: 0,
      smoothingTimeConstant: 30,
      visualizerBars: {},
      barWidth: 14,
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
      const visualizerBars = {}
      for (let i = 0; i < dataArray.length; i++) {
        visualizerBars[i] = dataArray[i];
      }
      this.setState({ visualizerBars });
    }, 10);
  }

  handleSmoothingTimeConstantChange = (e, value) => {
    this.setState({ smoothingTimeConstant: value });
    this.props.analyserNode.smoothingTimeConstant = Number(value) / 100;
  }

  handleFftSizeChange = (e, value) => {
    const fftSizePercentage = Number(value);
    this.setState({ fftSize: value });

    let fftSize = this.props.analyserNode.fftSize;
    let barWidth;
    if (fftSizePercentage <= 25) {
      fftSize = 64;
      barWidth = 14;
    }
    if (fftSizePercentage > 25 && fftSizePercentage <= 50) {
      fftSize = 128;
      barWidth = 10;
    }
    if (fftSizePercentage > 50 && fftSizePercentage <= 75) {
      fftSize = 256;
      barWidth = 5;
    }
    if (fftSizePercentage > 75 && fftSizePercentage <= 100) {
      fftSize = 512;
      barWidth = 3;
    }
    this.props.analyserNode.fftSize = fftSize;
    this.setState({ barWidth })
    return this.setupVisualizerInterval();
  }

  render() {
    const bars = Object.keys(this.state.visualizerBars)
      .map(bar => <Bar key={bar} height={this.state.visualizerBars[bar]} width={this.state.barWidth} />);
    return (
      <div style={{ width: '100%' }}>
        <Typography id="smoothing-time-constant">Smoothing Time Constant</Typography>
        <Slider value={this.state.smoothingTimeConstant} aria-labelledby="smoothing-time-constant" onChange={this.handleSmoothingTimeConstantChange} />
        <Typography id="fft-size">FFT Size</Typography>
        <Slider aria-labelledby="fft-size" value={this.state.fftSize} onChange={this.handleFftSizeChange} />
        <div style={{ display: 'flex', alignItems: 'flex-end', alignContent: 'flex-end', height: '200px', width: '500px' }}>
          {bars}
        </div>
      </div>
    );
  }
}
