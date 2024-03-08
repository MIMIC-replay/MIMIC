import requests

## This script compresses (minifies) using the TopTotal API
##  the JS script
## It creates a minified version of the file without altering the original.

with open('./script.owl.js', 'r') as file:
  js_content = file.read()

response = requests.post(
  'https://www.toptal.com/developers/javascript-minifier/api/raw', 
  data = dict(input = js_content)
).text

with open('./script.mini.owl.js', 'w') as file:
  file.write(response)
