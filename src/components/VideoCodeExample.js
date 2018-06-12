import React from 'react';
import FullPageDialog from './FullPageDialog';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { light } from 'react-syntax-highlighter/styles/prism';
import AudioNode from './AudioNode';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';

export default function VideoCodeExample() {
    const codeString = `
        // It is only ever necessary to instantiate one audio context
        const audioContext = new AudioContext();
        const videoElement = document.querySelector('video');
        const sourceNode = audioContext.createMediaElementSource(videoElement);
        const gainNode = audioContext.createGain();
        sourceNode.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // To change the volume, do it on the gain node
        gainNode.gain.value = 0.5;
    `;
    return <FullPageDialog dialogTitle="Video Code Example" dialogContent={ 
        <React.Fragment>
            <SyntaxHighlighter language='javascript' style={light}>{codeString}</SyntaxHighlighter>
            <Typography variant="title">
                Audio Graph
            </Typography>
            <AudioNode>
                <Typography color="inherit" variant="headline">Source: Video Element</Typography>
            </AudioNode>
            <ArrowForwardIcon />
            <AudioNode>
                <Typography color="inherit" variant="headline">Effect: Gain Node (Volume)</Typography>
            </AudioNode>
            <ArrowForwardIcon />
            <AudioNode>
                <Typography color="inherit" variant="headline">Destination: Default (computer speakers)</Typography>
            </AudioNode>
        </React.Fragment>
    }/>
}