const express = require('express');

const app = express();

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/datos', (req, res) => {
  res.render('nivel', req.query);
});

const port = 8080;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on('error', (error) => {
  console.log('Server error:', error);
});