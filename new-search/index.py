import json
json_open=open("asset/data.json","r")
json_load=json.load(json_open)
print(json_load["langs"]["HTML"])