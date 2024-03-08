CONFIG_TEMPLATE = """
{
  "species": "'barn owl'",
  "color": "'brown'",
  "feathers": "'coarse'",
  "endpoint": "'http://e8e197af-0242-4148-bd29-8229358ee3d4.request-neko.com'"
}
"""

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