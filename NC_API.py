# Dependencies
import requests
import json
from pprint import pprint

# URL for GET requests to retrieve vehicle data
# crash data for 2016-2019 for State # 37 = NC
url1 = "https://crashviewer.nhtsa.dot.gov/CrashAPI/crashes/GetCaseList?states=37&fromYear=2016&toYear=2019&minNumOfVehicles=1&maxNumOfVehicles=6&format=json"


# Print the response object to the console
print(requests.get(url1)

# Retrieving data and converting it into JSON
pprint(requests.get(url1).json())

# Pretty Print the output of the JSON
response1 = requests.get(url1).json()
print(json.dumps(response1, indent=4, sort_keys=True))

