import express from 'express';
import GenContent from './global/content';
import GetFeed from './feed/handle';
import PostResource from './form/handle';

const app = express();

// Data by default should always be JSON. If you're still using XML /shrug
app.use(express.static(`${__dirname}/../client/build`));
app.use(express.json());

app.get('/getFeed', (req, res) => {
  GetFeed(req, res);
});

app.head('/getFeed', (req, res) => {
  res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});

app.post('/newResource', (req, res) => {
  PostResource(req, res);
});

// any ask should serve React, unless specified
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/../client/build/index.html`);
});

// create initial data and servable icons
GenContent();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
