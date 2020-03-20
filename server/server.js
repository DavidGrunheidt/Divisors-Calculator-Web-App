const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/divisors', (req, res) => {
  let reqNumber = parseInt(req.query.number)

  let divisors = calculateDivisors(reqNumber)
  let isPrime = divisors.length <= 2

  res.send({ express: {reqNumber, divisors, isPrime} });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function calculateDivisors(number) {
  let divisors = [1]
  for (var i = 2; i < parseInt(number/2); i++) {
    if (number % i == 0) {
      divisors.push(i)
    }
  }
  divisors.push(number)
  return divisors
}