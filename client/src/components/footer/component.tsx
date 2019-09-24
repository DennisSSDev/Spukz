import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import { FormDialog, Shape } from '../dialog';

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0
    }
  })
);

const VisualComponent: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <AppBar color="primary" position="fixed" className={classes.appBar}>
      <Toolbar>
        <FormDialog shape={Shape.Circle} />
        <Typography>(c) Dennis Slavinsky</Typography>
      </Toolbar>
    </AppBar>
  );
};

export const Footer = VisualComponent;
