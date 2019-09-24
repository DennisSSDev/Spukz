import express from 'express';
import { Resource, Type, Tag } from './dataTypes';
import GLOBAL, { GetResources, AddNewResource, GenContent } from './dataStore';

// Data by default should always be JSON. If you're still using XML /shrug
const app = express();
app.use(express.static(`${__dirname}/../client/build`));
app.use(express.json());

app.get('/getFeed', (req, res) => {
  const { query } = req;

  const { accept } = req.headers;
  if (!accept) {
    res.status(400).json({
      id: 'NoAcceptHeader',
      message: 'The accept header was not provided'
    });
  }
  if (accept !== 'application/json') {
    res.status(400).json({
      id: 'NotSupportedAccept',
      message: 'The specified accept header is not supported'
    });
  }
  const start = query.start as number;
  const end = query.end as number;
  const tagsArr: Tag[] = [];
  // deal with tags. There is no future plan to add more tags so this is fine
  if (query.github && query.github === 'true') tagsArr.push(Tag.GitHub);
  if (query.cpp && query.cpp === 'true') tagsArr.push(Tag['C++']);
  if (query.vault && query.vault === 'true') tagsArr.push(Tag.Vault);
  if (query.unreal && query.unreal === 'true') tagsArr.push(Tag.Unreal);
  if (query.unity && query.unity === 'true') tagsArr.push(Tag.Unity);
  try {
    res.json(GetResources(start, end, tagsArr));
    return;
  } catch (err) {
    if (err.message === 'RangeOverflow') {
      res.status(400).json({
        id: 'RangeOverflow',
        message: 'The given range is not valid'
      });
      return;
    }
    res.status(500).json({
      id: 'ErrorResourceRequest',
      message: 'The server failed to return to find the requested resource'
    });
  }
});

app.head('/getFeed', (req, res) => {
  res.writeHead(200, undefined, { 'Content-Type': 'application/json' }).send();
});

app.post('/newResource', (req, res) => {
  const { body } = req;
  const { type, link, description, tags } = body;

  const newResource: Resource = {
    type,
    link,
    description,
    tags,
    icon: GLOBAL.iconMap[type as Type]
  };
  if (!type || !link) {
    res.status(400).json({
      id: 'InvalidParams',
      message: 'The supplied parameters are invalid'
    });
    return;
  }
  if (!Object.values(Type).includes(type)) {
    res.status(404).json({
      id: 'InvalidType',
      message: 'The supplied resource type does not exist'
    });
  }
  // todo: validate link
  if (!description) {
    newResource.description = '';
  }
  let status = 201;
  try {
    status = AddNewResource(newResource);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (status !== 201) {
    res.status(status).send();
    return;
  }
  res
    .status(status)
    .json({ id: 'OK', message: 'successfully added new resource' });
});

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/../client/build/index.html`);
});

// create initial data and servable icons
GenContent();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
