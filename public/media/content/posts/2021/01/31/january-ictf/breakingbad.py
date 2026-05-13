import requests
import json

response = requests.get("https://www.breakingbadapi.com/api/characters?limit=150")
output = json.dumps(response.json(), indent=4, sort_keys=True)
load = json.loads(output)

for x in load:
    f = ("%s" % (x['name'])).encode('utf-8').strip()
    f += ("__%s" % (x['nickname'])).encode('utf-8').strip()
    print(f)