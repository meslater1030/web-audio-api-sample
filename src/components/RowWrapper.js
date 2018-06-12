import React from 'react';

class RowWrapper extends React.Component {
  render() {
    return (
        <div style={{ display: 'flex', alignItems: this.props.alignItems ? 'center' : 'unset'}}>
            {this.props.children}
        </div>
    );
  }
}

export default RowWrapper;