import re
import pymongo
from fastapi.middleware.cors import CORSMiddleware
from supertokens_fastapi import get_cors_allowed_headers
import uvicorn
from fastapi import FastAPI, File, UploadFile, Request
import json
from bson.json_util import dumps

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Content-Type"] + get_cors_allowed_headers(),
)
client = pymongo.MongoClient("mongodb+srv://nandan:pollutionHack@pollutionboard.y5qvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")






@app.get("/data")
async def create_item2(request: Request):
    db = client.get_database('myFirstDatabase')
    mycol = db["template"]

    return dumps(mycol.find_one())


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0",port=5001,debug="True")