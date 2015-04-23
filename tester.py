import pymongo

conn = pymongo.MongoClient()
db = conn.tweets

db.tweets.dropDatabase()
