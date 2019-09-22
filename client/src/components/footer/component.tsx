import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Typography, Box } from '@material-ui/core';
import { WhiteText } from '../title';

const useStyles = makeStyles(() =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto'
    },
    divider: {
      marginTop: 1,
      marginBottom: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      borderStyle: 'solid',
      color: '#252525',
      width: 600,
      borderWidth: 2,
      borderRadius: 30
    }
  })
);

const VisualComponent: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box
        marginTop={7}
        marginBottom={7}
        mx="auto"
        fontWeight="fontWeightBold"
        textAlign="center"
      >
        <hr className={classes.divider} />
        <WhiteText>
          It appears you have reached the end... Or have you?
        </WhiteText>
      </Box>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon />
          </Fab>
          <Typography>(c) Dennis Slavinsky</Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export const Footer = VisualComponent;
