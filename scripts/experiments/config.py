import json
from template import JS_TEMPLATE 

def generate_script(json_data):
  js_code = JS_TEMPLATE.format(
    species = json_data['species'],
    color = json_data['color'], 
    feathers = json_data['feathers'],
    endpoint = json_data['endpoint'])
  return js_code


with open('./config.owl.json', 'r') as file:
  json_data = json.load(file)

js_script = generate_script(json_data)

with open('./owl_data.js', 'w') as file:
  file.write(js_script)