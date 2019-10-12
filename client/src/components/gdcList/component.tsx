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
      minWidth: 350,
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
      minHeight: 100
    },
    title: {
      minHeight: 60
    }
  })
);

export interface GDCTalk {
  title: string;
  track: string;
  description: string;
  speakers: string;
  id: string;
}

export interface IconResponse {
  icon: string;
}

export type GDCTalks = Record<number, GDCTalk>;

export interface State {
  talks: GDCTalk[];
  icon: string;
}

const VisualComponent: React.FunctionComponent = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState<State>({
    talks: [],
    icon: ''
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      const resp = await fetch('/gdctalks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      if (!resp.ok) {
        return;
      }
      const data = (await resp.json()) as GDCTalks;
      const talks: GDCTalk[] = [];
      Object.keys(data).forEach(key => {
        const un = key as unknown;
        talks.push(data[un as number]);
      });
      if (!talks) {
        return;
      }
      const iconResp = await fetch('/icon?type=GDCVault', {
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
      setValues({ talks, icon: iconJSON.icon });
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
          {values.talks.map(value => (
            <Grid key={value.title} item>
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
                        src={`data:image/png;base64, ${values.icon}`}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} spacing={1} sm container>
                    <Grid item xs container direction="column">
                      <Grid item xs zeroMinWidth>
                        <Box className={classes.title}>
                          <WhiteText
                            gutterBottom
                            variant="subtitle1"
                            align="center"
                          >
                            {`${value.title}`}
                          </WhiteText>
                        </Box>
                        <Box
                          paddingTop={2}
                          display="flex"
                          flexDirection="row"
                          justifyContent="start"
                        >
                          <div className={classes.speaker}>
                            <WhiteText variant="subtitle1" color="secondary">
                              Speakers
                            </WhiteText>
                            <Typography className={classes.subTitle}>
                              {value.speakers}
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
                              href={`https://www.gdcvault.com/play/${value.id}`}
                              variant="outlined"
                              color="secondary"
                            >
                              Watch
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

export const GDCTalkList = VisualComponent;
