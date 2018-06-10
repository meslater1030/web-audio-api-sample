import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({  
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ContentWrapper extends React.Component {
  render() {
    const { classes } = this.props;

    return (
        <main className={classes.content}>
            {this.props.children}
        </main>
    );
  }
}

export default withStyles(styles)(ContentWrapper);