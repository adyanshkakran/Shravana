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
		response.message("Welcome to Shravana Bot. Please reply with any of the following options: \n 1. Home Maintenance \n 2. Delivery \n 3. Groceries \n 4. Medical Services")

	elif user_msg == "1":
		response.message("Please select any of the following options: \n a. Electrician \n b. Plumber \n c. Carpenter \n d. Painter")

	elif user_msg == "2":
		response.message("Please select any of the following options: \n a. Food Delivery \n b. Parcel Delivery")

	elif user_msg == "3":
		response.message("Please select any of the following options: \n a. Vegetables \n b. Fruits \n c. Groceries")

	elif user_msg == "4":
		response.message("Please select any of the following options: \n a. Doctor Booking \n b. Medicine")

	else :
		response.message("I am still learning, I will get back to you soon")

	return str(response)


if __name__ == "__main__":
	app.run()
