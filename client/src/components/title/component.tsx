import React from 'react';
import { Typography, Box, createStyles } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';

export interface PublicProps {
  title: string;
}

type Props = PublicProps;

export const WhiteText = withStyles({
  root: {
    color: 'white'
  }
})(Typography);

const useStyles = makeStyles(() =>
  createStyles({
    divider: {
      display: 'block',
      marginTop: 1,
      marginBottom: 28,
      marginLeft: 'auto',
      marginRight: 'auto',
      borderStyle: 'solid',
      color: '#20599B',
      width: 350,
      borderWidth: 3,
      borderRadius: 30
    }
  })
);

const VisualComponent: React.FunctionComponent<Props> = (props: Props) => {
  const { title } = props;
  const classes = useStyles();
  return (
    <Box
      marginTop={15}
      mx="auto"
      fontWeight="fontWeightBold"
      textAlign="center"
    >
      <hr className={classes.divider} />
      <WhiteText variant="h4">{title}</WhiteText>
    </Box>
  );
};

export const Title = VisualComponent;
