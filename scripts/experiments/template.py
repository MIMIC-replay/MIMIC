JS_TEMPLATE = """
let color = {value1}
let endpoint = {endpoint}
console.log(color) 

fetch(endpoint, {{
    method: 'POST',
        headers: {{ 'Content-Type': 'application/json' }},
        body: JSON.stringify({{ message: color }})
  }})
"""