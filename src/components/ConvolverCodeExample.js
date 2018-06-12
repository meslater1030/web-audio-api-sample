import React from 'react';
import FullPageDialog from './FullPageDialog';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { light } from 'react-syntax-highlighter/styles/prism';
import AudioNode from './AudioNode';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';

export default function ConvolverCodeExample() {
    const codeString = `
        // Part One: Get Buffer
        const audioContext = new AudioContext();
        const bufferPromise = new Promise((resolve, reject) => {
            const ajaxRequest = new XMLHttpRequest();
            ajaxRequest.open('GET', 'https://some_audio_file.mp3', true);
            ajaxRequest.responseType = 'arraybuffer';
            ajaxRequest.onload = () => audioContext.decodeAudioData(ajaxRequest.response, resolve, reject);
            ajaxRequest.send();
          });
        
        // Part Two: setup audio graph
        bufferPromise.then((buffer) => {
            const videoElement = document.querySelector('video');
            const sourceNode = audioContext.createMediaElementSource(videoElement);
            const convolverNode = audioContext.createConvolver();
            convolverNode.buffer = buffer;
            const gainNode = qudioContext.createGain();
            sourceNode.connect(convolverNode);
            convolverNode.connect(gainNode);
            gainNode.connect(audioContext.destination);
        })

    `;
    return <FullPageDialog dialogTitle="Convolver Code Example" dialogContent={ 
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
                <Typography color="inherit" variant="body2">Effect: Convolver Node</Typography>
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