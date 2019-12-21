# Dependencies
import requests
import json
from pprint import pprint

# URL for GET requests to retrieve FRED data
# CUUR0000SA0R = Purchasing Power of the Dollar
# url1 = "https://api.stlouisfed.org/fred/series/observations?series_id=CUUR0000SA0R&realtime_start=1913-01-01&realtime_end=2019-12-01&api_key=b70be8712d69a178790fd5a0376be3b2&file_type=json"
# url1 = "https://api.stlouisfed.org/fred/series?series_id=CUUR0000SA0R&api_key=b70be8712d69a178790fd5a0376be3b2&file_type=json"

url1 = "https://api.stlouisfed.org/fred/series/observations?series_id=CPIAUCNS&realtime_start=1913-01-01&realtime_end=2019-12-01&api_key=b70be8712d69a178790fd5a0376be3b2&file_type=json"
# url1 = "https://api.stlouisfed.org/fred/series?series_id=CPIAUCNS&api_key=b70be8712d69a178790fd5a0376be3b2&file_type=json"

# """Federal Debt: Total Public Debt (GFDEBTN)
# Federal Debt: Total Public Debt as Percent of Gross Domestic Product (GFDEGDQ188S)
# Labor Force Participation Rate (CIVPART)
# Civilian Labor Force Participation Rate: Women (LNU01300002)
# Civilian Labor Force Participation Rate: Men (LNU01300001)
# Personal current taxes: Federal: Income taxes (B231RC1A027NBEA)
# Federal government current tax receipts: Taxes on corporate income: Federal Reserve banks (B677RC1A027NBEA)
# State and local government current tax receipts: Personal current taxes: Income taxes (ASLPITAX)
# Real Disposable Personal Income (A067RL1A156NBEA)
# Personal income per capita (A792RC0A052NBEA)
# Personal income (A065RC1A027NBEA)
# Per Capita Personal Income in North Carolina (NCPCPI)
# Real Median Family Income in the United States (MEFAINUSA672N)
# Personal saving as a percentage of disposable personal income (A072RC1A156NBEA)
# Consumer Price Index for All Urban Consumers: All Items in U.S. City Average (CPIAUCSL)
# Real Gross Domestic Product (GDPC1)
# Unemployment Rate (UNRATE)
# St. Louis Adjusted Monetary Base (AMBNS)
# Monetary Base; Currency in Circulation (MBCURRCIR)
# S&P/Case-Shiller U.S. National Home Price Index (CSUSHPINSA)
# Industrial Production Index (INDPRO)
# Velocity of M1 Money Stock (M1V)
# Excess Reserves of Depository Institutions (EXCSRESNW)
# Commercial and Industrial Loans, All Commercial Banks (TOTCI)"""

# Print the response object to the console
print(requests.get(url1))

# Retrieving data and converting it into JSON
pprint(requests.get(url1).json())

# Pretty Print the output of the JSON
response1 = requests.get(url1).json()
print(json.dumps(response1, indent=4, sort_keys=True))