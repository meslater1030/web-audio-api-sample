import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <div style={{ flex: 2 }}>
            <Typography variant="title" color="inherit" style={{ flex: 2 }}>
              {props.appTitle}
            </Typography>
            <Typography color="inherit">
              Megan Slater
            </Typography>
            <Typography>
              @meslater1030
            </Typography>
          </div>
          <img src="./GenUILogo.png" style={{ height: '80px' }}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);