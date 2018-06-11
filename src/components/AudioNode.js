import React from 'react';
import './AudioNode.css';

export default class AudioNode extends React.Component {
    render() {
        return <div className="audio-node">{this.props.children}</div>;
    }
}