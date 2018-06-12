import React from 'react';
import FullPageDialog from './FullPageDialog';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { light } from 'react-syntax-highlighter/styles/prism';
import AudioNode from './AudioNode';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';

export default function VideoCodeExample() {
    const codeString = `
        // Part One: Set up the audio graph
        const audioContext = new AudioContext();
        const videoElement = document.querySelector('video');
        const sourceNode = audioContext.createMediaElementSource(videoElement);
        const gainNode = audioContext.createGain();
        const analyserNode = audioContext.createAnalyser();
        sourceNode.connect(analyserNode);
        analyserNode.connect(sourceNode);
        gainNode.connect(audioContext.destination);

        // Part Two: poll for data regarding the audio that's received
        // Create an empty array the length of the frequencyBinCount
        const dataArray = new Float32Array(analyser.frequencyBinCount);

        setInterval(() => {
            const state = {};
            // Fill the array with information about the volume at various frequencies
            for (let i = 0; i < dataArray.length; i++) {
                state[i] = dataArray[i];
            }

            // Give the React state information about the volume at various frequencies
            this.setState(state)
        }, 100)
    `;
    return <FullPageDialog dialogTitle="Analyser Code Example" dialogContent={ 
        <React.Fragment>
            <SyntaxHighlighter language='javascript' style={light}>{codeString}</SyntaxHighlighter>
            <Typography variant="title">
                Audio Graph
            </Typography>
            <AudioNode>
                <Typography color="inherit" variant="body2">Source: Video Element</Typography>
            </AudioNode>
            <ArrowForwardIcon />
            <AudioNode>
                <Typography color="inherit" variant="body2">Analyzer Node</Typography>
            </AudioNode>
            <ArrowForwardIcon />
            <AudioNode>
                <Typography color="inherit" variant="body2">Effect: Gain Node (Volume)</Typography>
            </AudioNode>
            <ArrowForwardIcon />
            <AudioNode>
                <Typography color="inherit" variant="body2">Destination: Default (computer speakers)</Typography>
            </AudioNode>
        </React.Fragment>
    }/>
}