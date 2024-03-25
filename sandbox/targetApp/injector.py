from bs4 import BeautifulSoup, Comment
import glob

def inject_scripts(raw_file):
  with open(raw_file, 'r') as file:
    html_content = file.read()
    if "Mimic Start" in html_content: 
      return

    soup = BeautifulSoup(html_content, 'html.parser')

    rrweb_script = soup.new_tag('script') 
    rrweb_script['src'] = "https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb-all.min.js"
    rrweb_script['class'] = 'mimic'

    mimic_script = soup.new_tag('script')
    mimic_script['src'] = "./script.mimic.js"
    mimic_script['class'] = 'mimic'

    soup.head.extend([ 
      Comment('Mimic Start'),   
      '\n',
      rrweb_script, 
      '\n',
      mimic_script,   
      '\n',         
      Comment('Mimic End'),    
      '\n'
    ])

    with open(raw_file, 'w') as file:
      file.write(str(soup))  


files = glob.glob('./**/*.html', recursive=True)
for file in files:
  inject_scripts(file)
  
print("Mimic script injected into html file(s)")