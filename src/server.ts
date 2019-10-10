import express from 'express';
import session from 'express-session';
import uuid from 'uuid/v4';
import path from 'path';
import GenContent from './global/content';
import GetFeed from './feed/handle';
import PostResource from './form/handle';
import { AddNewUser } from './global/dataStore';
import GetCompanies, { PostCompanyRating } from './company/handle';

const app = express();

const directory = __dirname;

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

app.get('/getFeed', (req, res) => {
  GetFeed(req, res);
});

app.head('/getFeed', (req, res) => {
  res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});

app.post('/newResource', (req, res) => {
  PostResource(req, res);
});

app.get('/getCompanies', (req, res) => {
  GetCompanies(req, res);
});

app.head('/getCompanies', (req, res) => {
  res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});

app.post('/postRating', (req, res) => {
  PostCompanyRating(req, res);
});

// any ask should serve React, unless specified
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './client/build' });
});

// create initial data and servable icons
GenContent();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
