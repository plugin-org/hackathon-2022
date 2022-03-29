
import pymongo
import requests
import datetime
client = pymongo.MongoClient("mongodb+srv://nandan:pollutionHack@pollutionboard.y5qvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.get_database('myFirstDatabase')
records = db.register
template = db.template
inp = {"bandar_road":[16.4971, 80.6561],"Auto Nagar":[16.5153, 80.6762],"governorpet":[16.5110, 80.6216]}

def insert_data(inp):
    data = {}
    for k,v in inp.items():
        dt = requests.get('https://api.breezometer.com/air-quality/v2/current-conditions?lat='+str(v[0])+'&lon='+str(v[1])+'&key=6232ce775c9345cfa552d05f56168120&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,dominant_pollutant_concentrations,pollutants_concentrations,pollutants_aqi_information').json()
        data.update({k:{"data":dt}})
    d = template.insert_one(data)
    return "done"
import time
  
 
while(True):
    insert_data(inp)
    print(datetime.datetime.now())
    time.sleep(10)


