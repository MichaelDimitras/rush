const fetch = require('node-fetch');

const webHookUrl = process.env.webhookurl;

// if (!webHookUrl) {
//     throw `ERROR getting webhok url ${webHookUrl}`;
// }

const sendMessage = (message) => {
    if(!typeof message === 'string') {
        console.error(`sendMessage expected message of type string instead got ${typeof message}`);
        return
    }
    fetch(webHookUrl, {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({"username": "Low Price Bot", "content": message})
     })
     .then(res => console.log('Message sent ', message));
 }

 module.exports = sendMessage;