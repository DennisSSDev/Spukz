import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Box } from '@material-ui/core';
import { WhiteText } from '../title';
import { FormDialog, Shape } from '../dialog';

const useStyles = makeStyles(() =>
  createStyles({
    grow: {
      flexGrow: 1
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
          <FormDialog shape={Shape.Circle} />
          <Typography>(c) Dennis Slavinsky</Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export const Footer = VisualComponent;
