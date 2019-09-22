import React from 'react';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FormSquareDialog } from '../dialog/square';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'nowrap'
    },
    tabSection: {
      flexGrow: 2.19
    },
    title: {
      flexGrow: 0.2,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      marginLeft: 15
    },
    contribute: {
      flexGrow: 1
    }
  })
);

export const RegularButton = withStyles({
  root: {
    textTransform: 'none'
  }
})(Button);

const VisualComponent: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h4">
            Spukz
          </Typography>
          <div className={classes.contribute}>
            <FormSquareDialog />
          </div>

          <div className={classes.tabSection}>
            <RegularButton size="large" color="secondary">
              <Typography variant="h5">Resources</Typography>
            </RegularButton>
            <RegularButton size="large" color="secondary">
              <Typography variant="h5">Code</Typography>
            </RegularButton>
            <RegularButton size="large" color="secondary">
              <Typography variant="h5">Companies</Typography>
            </RegularButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export const NavBar = VisualComponent;
