from bs4 import BeautifulSoup
import glob

def uninstall(raw_file):
  with open(raw_file, 'r') as file:
    html_content = file.read()
    soup = BeautifulSoup(html_content, 'html.parser')
    for script in soup.find_all('script'):
      if 'Owl' in script.get('class', []): 
        script.extract()
    with open(raw_file, 'w') as file:
      file.write(str(soup))

files = glob.glob('./**/*.html', recursive=True)
for file in files:
  uninstall(file)