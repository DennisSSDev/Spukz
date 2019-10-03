import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, Box, IconButton } from '@material-ui/core';
import ThumbUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownOutlined from '@material-ui/icons/ThumbDownOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
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
      minWidth: 230,
      maxWidth: 230,
      backgroundColor: '#424242'
    },
    control: {
      padding: theme.spacing(2)
    },
    imageFrame: {
      width: 98,
      height: 98
    },
    image: {
      marginTop: 8,
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%'
    },
    subTitle: {
      color: '#BEBEBE',
      paddingLeft: '7px'
    }
  })
);

export interface Company {
  name: string;
  link: string; // each company should have web presence
  icon: string;
  meta: { ratio: { like: number; dislike: number } };
}

export interface Vote {
  like: boolean;
  dislike: boolean;
  clicked: boolean;
  enableLike: boolean;
  enableDislike: boolean;
}

export interface State {
  companies: Company[];
  companyClicks: Record<string, Vote>;
}

const VisualComponent: React.FunctionComponent = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState<State>({
    companies: [],
    companyClicks: {}
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      const resp = await fetch('/getCompanies?page=0', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      if (!resp.ok) {
        return;
      }
      const data = await resp.json();
      if (!data) {
        return;
      }
      const { companyClicks } = values;
      const list: Company[] = data.companies;
      list.forEach(value => {
        companyClicks[value.name] = {
          like: false,
          dislike: false,
          clicked: false,
          enableLike: true,
          enableDislike: true
        };
      });
      setValues({ companies: data.companies, companyClicks });
    };
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const genCompanyRateResponder = (companyName: string, rating: boolean) => {
    return async () => {
      const result = rating;
      const { companyClicks, companies } = values;
      let i = -1;
      const company = companies.find((value, index) => {
        if (value.name === companyName) {
          i = index;
          return true;
        }
        return false;
      });
      if (!company) {
        return;
      }
      if (result) {
        if (!companyClicks[companyName].enableLike) return;
        company.meta.ratio.like++;
        if (companyClicks[companyName].clicked) {
          company.meta.ratio.dislike--;
        }
        companyClicks[companyName].enableDislike = true;
        companyClicks[companyName].enableLike = false;
        companyClicks[companyName].like = true;
        companyClicks[companyName].dislike = false;
      } else {
        if (!companyClicks[companyName].enableDislike) return;
        company.meta.ratio.dislike++;
        if (companyClicks[companyName].clicked) {
          company.meta.ratio.like--;
        }
        companyClicks[companyName].enableLike = true;
        companyClicks[companyName].enableDislike = false;
        companyClicks[companyName].dislike = true;
        companyClicks[companyName].like = false;
      }
      companies[i] = company;
      companyClicks[companyName].clicked = true;
      setValues({ ...values, companyClicks });
      await fetch('/postRating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, rating })
      });
    };
  };
  const { companyClicks } = values;
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          {values.companies.map(value => (
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
                        src={`data:image/png;base64, ${value.icon}`}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} spacing={1} sm container>
                    <Grid item xs container direction="column">
                      <Grid item xs zeroMinWidth>
                        <WhiteText gutterBottom variant="h6" align="center">
                          {`${value.name}`}
                        </WhiteText>
                        <Box
                          marginLeft={5}
                          marginRight={5}
                          paddingTop={2}
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <div>
                            <IconButton
                              size="small"
                              onClick={genCompanyRateResponder(
                                value.name,
                                true
                              )}
                            >
                              {(companyClicks[value.name].like && (
                                <ThumbUpIcon color="secondary" />
                              )) || <ThumbUpOutlined color="secondary" />}
                            </IconButton>
                            <Typography className={classes.subTitle}>
                              {`${value.meta.ratio.like}`}
                            </Typography>
                          </div>
                          <div>
                            <IconButton
                              size="small"
                              onClick={genCompanyRateResponder(
                                value.name,
                                false
                              )}
                            >
                              {(companyClicks[value.name].dislike && (
                                <ThumbDownIcon color="error" />
                              )) || <ThumbDownOutlined color="error" />}
                            </IconButton>
                            <Typography className={classes.subTitle}>
                              {`${value.meta.ratio.dislike}`}
                            </Typography>
                          </div>
                        </Box>
                        <Box
                          paddingTop={2}
                          display="flex"
                          flexDirection="row"
                          justifyContent="center"
                        >
                          <RegularButton
                            href={value.link}
                            variant="outlined"
                            color="secondary"
                          >
                            Careers Page
                          </RegularButton>
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

export const CompanyList = VisualComponent;
