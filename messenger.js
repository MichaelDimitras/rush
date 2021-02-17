const fetch = require('node-fetch');

const webHookUrl = 'https://discord.com/api/webhooks/811646590146183208/Alicywya4PXSm51AmeJxDwJu2jmGhpG7LmPFgA2QBbqrqg6L8levqkl035oqGiPkDUE8';

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
     });
 }

 module.exports = sendMessage;