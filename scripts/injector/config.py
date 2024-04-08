import json, sys
from template import MIMIC_TEMPLATE

## UNIQUE_PROJECT_ID = uuid.uuid4()
# Dynamically creates a string based on the JS_TEMPLATE, filling its placeholders (between {}) 
#   with the values from the passed in json file (as a string)
def generate_script(uniqueProjectId, backendUrl):
  js_code = MIMIC_TEMPLATE.format(
    projectId = uniqueProjectId, backendUrl = backendUrl)
  return js_code

# Dynamically creates a string that mimics JS code with the values from the 
#   `config.mimic.json` file  and stores it in the js_script variable
js_script = generate_script(sys.argv[1], sys.argv[2])

# From the pseudo-JS string, this creates a real JS file, with real, functional JS code
with open('./script.mimic.js', 'w') as file:
  file.write(js_script)