import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, Box, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { WhiteText } from '../title';
import { RegularButton } from '../dialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: 15
    },
    paper: {
      padding: theme.spacing(2),
      margin: '0 auto',
      minWidth: 250,
      maxWidth: 350,
      minHeight: 400,
      backgroundColor: '#424242'
    },
    imageFrame: {
      width: 128,
      height: 128
    },
    image: {
      marginTop: 8,
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%'
    },
    subTitle: {
      color: '#BEBEBE'
    },
    speaker: {
      minHeight: 75
    },
    title: {
      minHeight: 60
    }
  })
);

export interface Repo {
  name: string;
  html_url: string;
  description: string;
  language: string; // what programming language?
  fork: boolean; // is it a fork?
  stargazers_count: number; // starts
  pushed_at: Date; // last commit
  score: number; // score represents the "good stuff" about the repo, ie do you even have a readme?
}

export interface IconResponse {
  icon: string;
}

export interface State {
  repos: Repo[];
  icon: string;
}

const VisualComponent: React.FunctionComponent = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState<State>({
    repos: [],
    icon: ''
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      const resp = await fetch('/github', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      if (!resp.ok) {
        return;
      }
      const repos = await resp.json();
      if (!repos) {
        return;
      }
      const iconResp = await fetch('/icon?type=GitHub', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      if (!iconResp.ok) {
        return;
      }
      const iconJSON = (await iconResp.json()) as IconResponse;
      setValues({ repos, icon: iconJSON.icon });
    };
    fetchCompanies();
    // uncomment this if you want the effect to be called more than once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GDCToolTip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#424242',
      maxWidth: 350,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #424242'
    }
  }))(Tooltip);

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {values.repos.map(value => (
            <Grid key={value.name} item>
              <Paper className={classes.paper}>
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  alignContent="center"
                  alignItems="center"
                >
                  <Grid container direction="column" alignContent="center">
                    <div className={classes.imageFrame}>
                      <img
                        className={classes.image}
                        alt="complex"
                        src={`data:image/svg+xml;base64, ${values.icon}`}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} spacing={1} sm container>
                    <Grid item xs container direction="column">
                      <Grid item xs zeroMinWidth>
                        <Box className={classes.title} marginTop={2}>
                          <WhiteText
                            gutterBottom
                            variant="subtitle1"
                            align="center"
                          >
                            {`${value.name}`}
                          </WhiteText>
                        </Box>
                        <Box
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                          flexWrap="wrap"
                        >
                          <div className={classes.speaker}>
                            <WhiteText variant="subtitle1" color="secondary">
                              Stars
                            </WhiteText>
                            <Typography className={classes.subTitle}>
                              {value.stargazers_count}
                            </Typography>
                          </div>
                          <div className={classes.speaker}>
                            <WhiteText variant="subtitle1" color="secondary">
                              Language
                            </WhiteText>
                            <Typography className={classes.subTitle}>
                              {value.language}
                            </Typography>
                          </div>
                          <div className={classes.speaker}>
                            <WhiteText variant="subtitle1" color="secondary">
                              Score
                            </WhiteText>
                            <Typography className={classes.subTitle}>
                              {value.score}
                            </Typography>
                          </div>
                          <div className={classes.speaker}>
                            <WhiteText variant="subtitle1" color="secondary">
                              Last Commit
                            </WhiteText>
                            <Typography className={classes.subTitle}>
                              {value.pushed_at}
                            </Typography>
                          </div>
                        </Box>
                        <Box
                          paddingTop={2}
                          display="flex"
                          flexDirection="row"
                          justifyContent="center"
                        >
                          <GDCToolTip
                            title={<Typography>{value.description}</Typography>}
                          >
                            <RegularButton
                              href={value.html_url}
                              variant="outlined"
                              color="secondary"
                            >
                              Repository
                            </RegularButton>
                          </GDCToolTip>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export const GitHubList = VisualComponent;
