from twilio.rest import Client

class TwilioSMS():
    def __init__(self):
        self.account_sid = 'AC7eec8143e5405fe6ebf67399c87a84aa'
        self.auth_token = '066bbc75860a096a4986e96e37b5d98b'
        #Hide these credentials somehow later
        self.client = Client(account_sid, auth_token)

    def sendMessage(self, msg, toNumber):
        self.message = client.messages \
                .create(
                     body=msg,
                     from_='+12075693690',
                     to=toNumber)