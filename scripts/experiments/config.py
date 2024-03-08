import json
from templates import CONFIG_TEMPLATE, JS_TEMPLATE

## Function definitions

# Creates a configuration file with default values (hard coded) from the passed-in template
def generate_config_file(json_template):
  with open('./config.owl.json', 'w') as file:
    file.write(json_template)

# Dynamically creates a string based on the JS_TEMPLATE, filling its placeholders (between {}) 
#   with the values from the passed in json file (as a string)
def generate_script(json_data):
  js_code = JS_TEMPLATE.format(
    species = json_data['species'],
    color = json_data['color'], 
    feathers = json_data['feathers'],
    endpoint = json_data['endpoint'])
  return js_code

## Function calls: script

# Creates a configuration file based on JSON_TEMPLATE
generate_config_file(CONFIG_TEMPLATE)

# Loads contents of config.owl.json as a string into the json_data variable
with open('./config.owl.json', 'r') as file:
  json_data = json.load(file)

# Dynamically creates a string that mimics JS code with the values from the 
#   `config.owl.json` file  and stores it in the js_script variable
js_script = generate_script(json_data)

# From the pseudo-JS string, this creates a real JS file, with real, functional JS code
with open('./script.owl.js', 'w') as file:
  file.write(js_script)