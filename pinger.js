const url = process.env.PING_URL ?? 'https://hottest916secretproject.herokuapp.com/health';
const axios = require('axios')

console.log('Running pinger');
axios
  .get(url)
  .then(res => {
    console.log(`Health check succeeded: ${res.statusCode}`)
  })
  .catch(error => {
    console.error(error)
  });