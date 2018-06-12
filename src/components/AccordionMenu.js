import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
    panel1Expanded: false,
    panel2Expanded: false,
    panel3Expanded: false,
    panel4Expanded: false,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, panel) => {
    this.setState({
      [`${panel}Expanded`]: !this.state[`${panel}Expanded`],
    });
  };

  render() {
    const { classes } = this.props;
    const { panel1Expanded, panel2Expanded, panel3Expanded, panel4Expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={panel1Expanded} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Audio Visualizer</Typography>
            <Typography className={classes.secondaryHeading}>A bar chart representing the audio</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {this.props.audioVisualizerDemo}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={panel2Expanded} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Convolver Controls</Typography>
            <Typography className={classes.secondaryHeading}>
              Options for adding an audio filter
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {this.props.convolverControls}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={panel3Expanded} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Panning Controls</Typography>
            <Typography className={classes.secondaryHeading}>
              Controls for audio directionality
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {this.props.panningControls}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={panel4Expanded} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Oscillation Controls</Typography>
            <Typography className={classes.secondaryHeading}>
              A Synth Keyboard
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {this.props.oscillationControls}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);