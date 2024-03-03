from flask import Flask
# from googlesearch import search
import requests
from twilio.twiml.messaging_response import MessagingResponse
from flask import request


app = Flask(__name__)

@app.route("/", methods=["POST"])

# chatbot logic
def bot():

	# user input
	user_msg = request.values.get('Body', '').lower()

	# creating object of MessagingResponse
	response = MessagingResponse()

	# User Query
	if user_msg == "hi":
		response.message("Hello, How can I help you?")

	elif user_msg == "hello":
		response.message("Welcome to Shravana Bot")

	else :
		response.message("I am still learning, I will get back to you soon")

	return str(response)


if __name__ == "__main__":
	app.run()
