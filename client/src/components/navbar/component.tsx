import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { FormDialog, Shape, RegularButton } from '../dialog';

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
      flexWrap: 'nowrap'
    },
    contribute: {
      flexGrow: 1
    },
    link: {
      textDecoration: 'none'
    }
  })
);

const VisualComponent: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <RegularButton size="large" color="inherit">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              <Typography className={classes.title} variant="h4">
                Spukz
              </Typography>
            </Link>
          </RegularButton>
          <div className={classes.contribute}>
            <FormDialog shape={Shape.Square} />
          </div>

          <div className={classes.tabSection}>
            <Link to="./resources" style={{ textDecoration: 'none' }}>
              <RegularButton size="large" color="secondary">
                <Typography variant="h5">Resources</Typography>
              </RegularButton>
            </Link>
            <Link to="./code" style={{ textDecoration: 'none' }}>
              <RegularButton size="large" color="secondary">
                <Typography variant="h5">Code</Typography>
              </RegularButton>
            </Link>
            <Link to="./companies" style={{ textDecoration: 'none' }}>
              <RegularButton size="large" color="secondary">
                <Typography variant="h5">Companies</Typography>
              </RegularButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export const NavBar = VisualComponent;
