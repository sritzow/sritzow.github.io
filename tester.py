import pymongo

conn = pymongo.MongoClient()
db = conn.tweets

for c in db.collection_names():
	print c
items = db.tweets.find()
for item in items:
	print item