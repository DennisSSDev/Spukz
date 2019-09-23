import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Box, Link, Container } from '@material-ui/core';
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
      backgroundColor: '#424242',
      height: 160,
      maxHeight: 160,
      minHeight: 160
    },
    imageFrame: {
      width: 78,
      height: 78
    },
    image: {
      marginTop: 28,
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
  imageType?: string;
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

interface State {
  shadow: number;
}

const VisualComponent: React.FunctionComponent<Props> = (props: Props) => {
  const [values, setValues] = React.useState<State>({
    shadow: 2
  });
  const { title, subtitle, image, imageType, link } = props;
  let { text } = props;
  const classes = useStyles();

  if (!title) {
    return <Placeholder />;
  }
  if (text) {
    text = text.slice(0, 120);
    text += '...';
  }

  const onMouseEnter = () => {
    setValues({ shadow: 20 });
  };

  const onMouseExit = () => {
    setValues({ shadow: 2 });
  };

  return (
    <Box marginTop={4} alignContent="center" className={classes.root}>
      <Container maxWidth="sm">
        <Paper
          className={classes.paper}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseExit}
          elevation={values.shadow}
        >
          <Link href={link} target="_blank">
            <Grid container spacing={2}>
              <Grid item>
                <div className={classes.imageFrame}>
                  <img
                    className={classes.image}
                    alt="complex"
                    src={`data:image/${imageType || 'png'};base64, ${image}`}
                  />
                </div>
              </Grid>
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
                      {`${subtitle}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={classes.subTitle}
                      color="textSecondary"
                    >
                      {`${text}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Link>
        </Paper>
      </Container>
    </Box>
  );
};

export const FeedEntry = VisualComponent;
