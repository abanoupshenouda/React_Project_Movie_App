import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { LoginContainer, RegisterContainer } from '../../screens/auth/LoginRegister';



class LoginRegisterModal extends React.Component {
  
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="primary"
            centered
          >
            <Tab label="Login" className={classes.tabRoot} />
            <Tab label="Register" className={classes.tabRoot} />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <TabContainer ><LoginContainer {...this.props} /></TabContainer>}
        {this.state.value === 1 && <TabContainer ><RegisterContainer {...this.props} /></TabContainer>}

      </div>
    );
  }
}


function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 400,
  },
  tabRoot: {
    marginRight: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,

  }
});


LoginRegisterModal.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LoginRegisterModal);
