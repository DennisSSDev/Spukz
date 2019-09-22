import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Box } from '@material-ui/core';
import { WhiteText } from '../title';
import './custom.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
      backgroundColor: '#424242'
    },
    image: {
      width: 128,
      height: 128
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%'
    },
    subTitle: {
      color: '#BEBEBE'
    }
  })
);

export interface PublicProps {
  title?: string;
  subtitle?: string;
  text?: string;
  image?: string;
  link?: string;
}

type Props = PublicProps;

const Placeholder: React.FunctionComponent<{}> = () => {
  return (
    <div className="placeholder-content">
      <div className="placeholder-content_item" />
      <div className="placeholder-content_item" />
      <div className="placeholder-content_item" />
      <div className="placeholder-content_item" />
      <div className="placeholder-content_item" />
      <div className="placeholder-content_item" />
      <div className="placeholder-content_item" />
      <div className="placeholder-content_item" />
      <div className="placeholder-content_item" />
      <div className="placeholder-content_item" />
      <div className="placeholder-content_item" />
    </div>
  );
};

const VisualComponent: React.FunctionComponent<Props> = (props: Props) => {
  const { title, subtitle, text, image } = props;
  const classes = useStyles();

  if (!title) {
    return <Placeholder />;
  }
  return (
    <Box marginTop={10} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <WhiteText gutterBottom variant="h6">
                  {`Added new ${title}`}
                </WhiteText>
                <Typography
                  variant="body1"
                  className={classes.subTitle}
                  gutterBottom
                >
                  {`Subtitle goes here ${subtitle}`}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.subTitle}
                  color="textSecondary"
                >
                  {`main text goes here ${text}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={image} />
            </ButtonBase>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export const FeedEntry = VisualComponent;
