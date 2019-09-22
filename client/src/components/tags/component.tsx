import React from 'react';
import { Box, createStyles, Grid, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    },
    chip: {
      fontSize: 15,
      borderWidth: 2,
      width: 90
    }
  })
);

const VisualComponent: React.FunctionComponent = () => {
  // const { title } = props;
  const classes = useStyles();
  return (
    <Box
      marginTop={3}
      mx="auto"
      fontWeight="fontWeightBold"
      textAlign="center"
      className={classes.root}
    >
      <Grid container justify="center" alignItems="center" direction="row">
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {['Github', 'C++', 'Vault', 'Unreal', 'Unity'].map(value => (
              <Grid key={value} item>
                <Chip
                  variant="outlined"
                  color="secondary"
                  clickable
                  label={value}
                  className={classes.chip}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export const Tags = VisualComponent;
