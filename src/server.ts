import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3'];
  res.json(list);
});

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

const port = process.env.PORT || 5000;
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
