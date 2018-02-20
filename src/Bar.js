import React from 'react';
import PropTypes from 'prop-types';

export default function Bar(props) {
  if (props.height === 0) {
    return <div />;
  }
  return (
    <div
      style={{
        height: `${150 + props.height}px`,
        width: '5px',
        backgroundColor: 'pink',
        display: 'inline-block',
        margin: '1px',
      }}
    />
  );
}

Bar.propTypes = {
  height: PropTypes.number.isRequired,
}
