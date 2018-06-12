import React from 'react';
import FullPageDialog from './FullPageDialog';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { light } from 'react-syntax-highlighter/styles/prism';
import AudioNode from './AudioNode';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';
import RowWrapper from './RowWrapper';
import ColumnWrapper from './ColumnWrapper';

export default function OscillatorCodeExample() {
    const codeString = `
        // Part One: setup audio graph
        const audioContext = new AudioContext();
        const videoElement = document.querySelector('video');
        const sourceNode = audioContext.createMediaElementSource(videoElement);
        const convolverNode = audioContext.createConvolver();
        convolverNode.buffer = buffer;
        const oscillatorNode = audioContext.createOscillator();
        oscillatorNode.start();
        const mergerNode = this.audioContext.createChannelMerger();
        const gainNode = qudioContext.createGain();
        sourceNode.connect(mergerNode);
        oscillatorNode.connect(mergerNode);
        mergerNode.connect(convolverNode);
        convolverNode.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Part Two: change oscillator frequency
        this.oscillatorNode.frequency.value = frequency;
    `;
    return <FullPageDialog dialogTitle="Oscillator Code Example" dialogContent={ 
        <React.Fragment>
            <SyntaxHighlighter language='javascript' style={light}>{codeString}</SyntaxHighlighter>
            <Typography variant="title">
                Audio Graph
            </Typography>
            <RowWrapper>
                <AudioNode>
                    <Typography color="inherit" variant="body2">Source: Video Element</Typography>
                </AudioNode>
                <ArrowForwardIcon />
                <AudioNode>
                    <Typography color="inherit" variant="body2">Merger Node</Typography>
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
            </RowWrapper>
            <RowWrapper alignItems>
                <AudioNode>
                    <Typography color="inherit" variant="body2">Source: Oscillator</Typography>
                </AudioNode>
                <ArrowForwardIcon style={{ transform: 'rotate(320deg)' }}/>
            </RowWrapper>
        </React.Fragment>
    }/>
}