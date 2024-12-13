const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(6969, () => {
  console.log(`Example app listening on port ${6969}`)
})
