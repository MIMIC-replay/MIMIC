import requests

with open('./owl_data.js', 'r') as file:
  js_content = file.read()

response = requests.post('https://www.toptal.com/developers/javascript-minifier/api/raw', data = dict(input = js_content)).text

with open('./owl_data.mini.js', 'w') as file:
  file.write(response)
