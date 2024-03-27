from fastapi import FastAPI
from dotenv import load_dotenv
import os
import tweepy
load_dotenv()


API_KEY = os.environ.get("API_KEY")
API_KEY_SECRET = os.environ.get("API_KEY_SECRET")
BEARER_TOKEN = os.environ.get("BEARER_TOKEN")
ACCESS_TOKEN = os.environ.get("ACCESS_TOKEN")
ACCESS_TOKEN_SECRET = os.environ.get("ACCESS_TOKEN_SECRET")

app = FastAPI()

@app.get("/get-user-tweets/{username}")
async def get_tweets_from_user(username: str):
  client = tweepy.Client( # NEW
        bearer_token=BEARER_TOKEN,
        consumer_key=API_KEY,
        consumer_secret=API_KEY_SECRET,
        access_token=ACCESS_TOKEN,
        access_token_secret=ACCESS_TOKEN_SECRET,
        wait_on_rate_limit=False,
    )
  user = client.get_user(username=username).data.id #NEW
  all_tweets = client.get_users_tweets(id = user, exclude="retweets", max_results=10)  #NEW
