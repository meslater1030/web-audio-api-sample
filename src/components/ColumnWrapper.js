import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({  
  content: {
    flex: 1,
    padding: theme.spacing.unit * 2,
  },
});

class ColumnWrapper extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <div className={classes.content}>
            {this.props.children}
        </div>
    );
  }
}

export default withStyles(styles)(ColumnWrapper);