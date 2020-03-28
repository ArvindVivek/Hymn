from flask import Flask, render_template
from TwilioSMS import TwilioSMS

app = Flask(__name__)
twilio = TwilioSMS()

@app.route('/index.html', methods=["GET"])
#Not really sure what to put for route at the moment
def index_page():
    render_template('index.html')

@app.route('/404.html', methods=["GET"])
def error_page():
    render_template('404.html')

if __name__ == '__main__':
    app.run()


    

