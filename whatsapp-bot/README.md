# whatsapp-bot

Some basic setup:

0. Create a virtual environment with `python3 -m venv whatsapp-bot`, activate is (`source whatsapp-bot/bin/activate`) and install requirements with `pip3 -r install requirements.txt`.
1. Create a developer account at [Meta Developers](https://developers.facebook.com/)
2. Create a Business Portfolio for Shravana at [Meta Business](https://business.facebook.com), doesn't work if L privelege.
3. Create a new app on the [Meta Developers](https://developers.facebook.com/) portal and add WhatsApp integration. Use the Business Portfolio that you just created when asked. 
4. You will be given a temporary phone number, a temporary access token etc. Fill in the following details from the `WhatsApp/Configuration` and 'App Settings/Basic' pages in your `.env`.
```
META_ACCESS_TOKEN
META_APP_ID
META_APP_SECRET
RECIPIENT_WAID # <= This is the number you want to demo from
META_PHONE_NUMBER_ID
```
5. Create an account on [ngrok](https://dashboard.ngrok.com/)
6. Authenticate yourself for ngrok following the steps in [Your Authtoken](https://dashboard.ngrok.com/get-started/your-authtoken).
7. Go to your [ngrok dashboard](https://dashboard.ngrok.com/), Cloud Edge > Domains. It should auto-create a domain, otherwise create a domain. It will give you a command you can use to `Start a Tunnel`. Run it in your terminal with the port changed from `80` to `8000`. Ex: `ngrok http --domain=your-app-name.ngrok-free.app 8000`.
8. Go to your App dashboard on [Meta Developer Portal](https://developers.facebook.com/apps), WhatsApp > Configuration and add a new Callback URL. This will be your `ngrok-url/webhook`. Ex: `https://your-app-name.ngrok-free.app/webhook`. It won't verify yet, so just wait.
9. Set the `Verify Token` to some secret token of your choice, and fill it in the `.env` as well (`META_VERIFY_TOKEN`).
10. Now run the flask server as described in step 15, then finish adding the webhook on the developer console. 
11. In the same page, click on `Manage` next to `Webhook fields` and tick `messages`. 
12. Login to OpenAI, create an [API Key](https://platform.openai.com/api-keys) and fill it into your `.env`.
13. Now create an [Assistant](https://platform.openai.com/assistants), fill in the "Instructions" with whatever prompt engineering you want. I went with this:
> You're a WhatsApp assistant bot that helps assist the Indian elderly. You will receive their messages translated from an Indic language to English. Do your best to comprehend the message, and reply informing them that the Shravana team have received their order and are working on fullfilling it. Be caring and friendly.
14. Fill in the `OPENAI_ASSISTANT_ID` environment variable.
15. To run the app, be in the parent directory of the folder containing this README file and run the command `flask --app whatsapp-bot run --debug -h 0.0.0.0 -p 8000`. Make sure the `ngrok` tunnel is active to catch the webhooks.
