const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/divisors', (req, res) => {
  res.send({ express: '1 2 3 4 5' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));