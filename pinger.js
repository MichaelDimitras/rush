
// const url = process.env.PING_URL;
const url = 'https://hottest916secretproject.herokuapp.com/health';
const axios = require('axios')

axios
  .get(url)
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })