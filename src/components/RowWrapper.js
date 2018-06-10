import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({  
  row: {
    display: 'flex',
  },
});

class RowWrapper extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <div className={classes.row}>
            {this.props.children}
        </div>
    );
  }
}

export default withStyles(styles)(RowWrapper);