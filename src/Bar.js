import React from 'react';

export default function Bar(props) {
  return (
    <div
      style={{
        height: `${200 + Number(props.height)}px`,
        width: `${props.width}px`,
        backgroundColor: 'pink',
        display: 'inline-block',
        margin: '0.5px',
      }}
    />
  );
}
