from flask import Flask, render_template
from TwilioSMS import TwilioSMS

app = Flask(__name__)
twilio = TwilioSMS()

@app.route('/', methods=["GET",'POST'])
#Not really sure what to put for route at the moment
def index_page():
    #wont work because index.html isn't in templates
    return render_template('index.html')
    

@app.route('/404.html', methods=["GET"])
def error_page():
    return render_template('404.html')

if __name__ == '__main__':
    #twilio.sendMessage('a', '+17142511492')
    app.run()


    

