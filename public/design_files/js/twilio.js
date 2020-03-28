const accountSid = 'AC7eec8143e5405fe6ebf67399c87a84aa';
const authToken = '066bbc75860a096a4986e96e37b5d98b';
const client = require('twilio')(accountSid, authToken);

function sendMessage() {
    client.messages.create({
        body: 'JS Test #1',
        from: '+12075693690',
        to: '+17142092509' 
    });
}

