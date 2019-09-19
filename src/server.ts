import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 5000;

process.env.PWD = process.cwd();

app.use(express.static(path.join(process.env.PWD, 'client/build')));

app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3'];
  res.json(list);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(process.env.PWD, 'client/build/index.html'));
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
