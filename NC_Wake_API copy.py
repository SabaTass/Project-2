# Dependencies
import requests
import json
from pprint import pprint

# URL for GET requests to retrieve vehicle data
# crash data for 2016-2018 for State # 37 = NC
url2 = "https://crashviewer.nhtsa.dot.gov/CrashAPI/crashes/GetCrashesByLocation?fromCaseYear=2016&toCaseYear=2019&state=37&county=183&format=json"


# Print the response object to the console
print(requests.get(url2)

# Retrieving data and converting it into JSON
pprint(requests.get(url2).json())

# Pretty Print the output of the JSON
response2 = requests.get(url2).json()
print(json.dumps(response2, indent=4, sort_keys=True))

