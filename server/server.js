const express = require('express');

const app = express();
const cors = require('cors');
const mongoClient = require('./mongodb')
const divisorsCalculator = require('./divisorsCalculator')
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://divisors-calculator-web.herokuapp.com'
}));

app.get('/api/divisors', (req, res) => {
  let reqNumber = parseInt(req.query.number)

  if (reqNumber < 1 || reqNumber > 1e8) {
    res.status(404).send('Error, number must be > 0 and < 10^8)')
  } else {
    let isPrime = false
    let divisors = []
  
    if (mongoClient.isConnected()) {
      let collectionName = 'numbers_divisors'
      
      mongoClient.findDocuments(collectionName, {'reqNumber': reqNumber}, (docs) => { 
        if (docs.length > 0) {
          divisors = docs[0].divisors
        } else {
          divisors = divisorsCalculator.calculateDivisors(reqNumber)
          mongoClient.insertDocuments([{reqNumber, divisors}], collectionName)
        }
        isPrime = divisors.length === 2
        res.send({ express: {reqNumber, divisors, isPrime} });
      })
    } else {
      divisors = divisorsCalculator.calculateDivisors(reqNumber)
      isPrime = divisors.length === 2
      res.send({ express: {reqNumber, divisors, isPrime} });
    }
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));