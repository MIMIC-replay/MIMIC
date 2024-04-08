from bs4 import BeautifulSoup, Comment
import glob, os

root_dir = '.'

def inject_scripts(raw_file):
  current_dir = os.path.dirname(raw_file)
  rel_dir = os.path.relpath(root_dir, current_dir)

  with open(raw_file, 'r') as file:
    html_content = file.read()
    if "Mimic Start" in html_content: 
      return

    soup = BeautifulSoup(html_content, 'html.parser')

    rrweb_script = soup.new_tag('script') 
    rrweb_script['src'] = "https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb-all.min.js"
    rrweb_script['class'] = 'mimic'
    rrweb_script.attrs['defer'] = None

    mimic_script = soup.new_tag('script')
    mimic_script['src'] = os.path.join(rel_dir, 'script.mimic.js') #"./script.mimic.js"
    mimic_script['class'] = 'mimic'
    mimic_script.attrs['defer'] = None

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
  
print("🔹 Mimic script injected into html file(s)")