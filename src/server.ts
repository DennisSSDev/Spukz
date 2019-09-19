import express from 'express';

const app = express();

app.use(express.static(`${__dirname}/../public`));

app.get('/api/getList', (req, res) => {
  const list = ['item1', 'item2', 'item3'];
  res.json(list);
});

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/../public/index.html`);
});

const port = process.env.PORT || 5000;
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
