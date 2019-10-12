import express from 'express';
import session from 'express-session';
import uuid from 'uuid/v4';
import path from 'path';
import got from 'got';
import GenContent from './global/content';
import GetFeed from './feed/handle';
import PostResource from './form/handle';
import {
  AddNewUser,
  SetGitHubStore,
  SetGDCTalkStore,
  produceStore
} from './global/dataStore';
import GetCompanies, { PostCompanyRating } from './company/handle';
import { GithubRepos, GDCTalk } from './global/dataTypes';
import { filterObject } from './misc/helper';
import GetGitHubRepos from './github/handle';
import GetGDCTalks from './gdctalks/handle';
import GetIcon from './icon/handle';

const app = express();
const directory = __dirname;

/**
 * Date from which to filter github repos from.
 * Anything older than this will not be considered
 */
const oldestDate = new Date('2018-01-01');

/**
 * Server setup
 */

// Data by default should always be JSON. If you're still using XML /shrug
app.use(express.static(path.resolve(`${directory}/../client/build`)));
app.use(express.json());
app.use(
  session({
    genid: () => {
      const id = uuid();
      AddNewUser(id);
      return id;
    },
    secret: 'devops_1n_D3_Hauz',
    resave: false,
    saveUninitialized: true
  })
);

/**
 * GETs and HEADs
 */

/**
 * Retrieve the feed of the latest community contributions
 */
app.get('/getFeed', (req, res) => {
  GetFeed(req, res);
});

app.head('/getFeed', (req, res) => {
  res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});

/**
 * Get companies that offer high profile internships
 */
app.get('/getCompanies', (req, res) => {
  GetCompanies(req, res);
});

app.head('/getCompanies', (req, res) => {
  res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});

/**
 * Retrieve uncurated github repos for Unity and Unreal
 */
app.get('/github', (req, res) => {
  GetGitHubRepos(req, res);
});

app.head('/github', (req, res) => {
  res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});

/**
 * Retrieve uncurated gdc vault data
 */
app.get('/gdctalks', (req, res) => {
  GetGDCTalks(req, res);
});

app.head('/gdctalks', (req, res) => {
  res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});

/**
 * Retrieve a specific icon if neccessary
 * options: YouTube, GitHub, GDCVault
 */
app.get('/icon', (req, res) => {
  GetIcon(req, res);
});

app.head('/icon', (req, res) => {
  res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});

/**
 * POSTs
 */

app.post('/newResource', (req, res) => {
  PostResource(req, res);
});

app.post('/postRating', (req, res) => {
  PostCompanyRating(req, res);
});

/**
 * STATIC SERVE
 */

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './client/build' });
});

// create initial meta data and servable icons
GenContent();

/**
 * Get the unreal github repos and cache them away
 */
got
  .get(
    'https://api.github.com/search/repositories?q=Unreal+language:cpp&sort=stars&order=desc',
    { json: true }
  )
  .then(response => {
    const json = response.body as GithubRepos;
    const store = produceStore(json, oldestDate);
    SetGitHubStore(store);
  })
  .catch(error => {
    console.log(error.response.body);
  });

/**
 * Get the unity gitub repos and cache them away
 */
got
  .get(
    'https://api.github.com/search/repositories?q=Unity+language:csharp&sort=stars&order=desc',
    { json: true }
  )
  .then(response => {
    const json = response.body as GithubRepos;
    const store = produceStore(json, oldestDate);
    SetGitHubStore(store, true);
  })
  .catch(error => {
    console.log(error.response.body);
  });

/**
 * Request the data for GDC vault 2019 talks (for now)
 * and filter them for Career Seminars,
 * as long as they are not related to artists
 */
got
  .get('http://yankooliveira.com/gdcvault/2019_extended.json', { json: true })
  .then(response => {
    const json = response.body;
    const predicate = (value: any): boolean => {
      const { title } = value;
      const titleS = title as string;
      return (
        // ignore all artist talks
        value.track === 'Game Career Seminar' &&
        !titleS.includes('Artist') &&
        !titleS.includes('artist') &&
        !titleS.includes('Artists') &&
        !titleS.includes('artists')
      );
    };
    const data = filterObject(json, predicate);
    SetGDCTalkStore(data as Record<number, GDCTalk>);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
