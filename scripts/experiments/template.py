JS_TEMPLATE = """
let species = {species}
let color = {color}
let feathers = {feathers}
let endpoint = {endpoint}
 

fetch(endpoint, {{
    method: 'POST',
        headers: {{ 'Content-Type': 'application/json' }},
        body: JSON.stringify({{ message: `The ${{species}} has ${{color}}, ${{feathers}} feathers`}})
  }})
"""