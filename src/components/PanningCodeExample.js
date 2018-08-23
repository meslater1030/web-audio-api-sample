import React from 'react';
import FullPageDialog from './FullPageDialog';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { light } from 'react-syntax-highlighter/styles/prism';
import AudioNode from './AudioNode';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';

export default function PanningCodeExample() {
    const codeString = `
        // Part One: Set up the Audio Graph
        cont videoElement = document.querySelector('video');
        const audioContext = new AudioContext();
        const sourceNode = audioContext.createMediaElementSource(videoElement);
        const gainNode = qudioContext.createGain();
        const pannerNode = audioContext.createStereoPanner();
        sourceNode.connect(pannerNode);
        pannerNode.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Part Two: Pan the audio
        pannerNode.pan.value = 0.20 // This value is between 0 and 1

    `;
    return <FullPageDialog dialogTitle="Panner Code Example" dialogContent={ 
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
                <Typography color="inherit" variant="body2">Effect: Panning Node</Typography>
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