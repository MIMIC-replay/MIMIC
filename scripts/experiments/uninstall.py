from bs4 import BeautifulSoup, Comment
import glob, os

def uninstall(raw_file):
  with open(raw_file, 'r') as file:
    html_content = file.read()
    soup = BeautifulSoup(html_content, 'html.parser')
    for script in soup.find_all('script'):
      if 'Owl' in script.get('class', []): 
        script.extract()
    for comment in soup.find_all(text = lambda text: isinstance(text, Comment) and 'Owl' in text ):
      comment.extract()
    for newlines in soup.find_all('\n\n\n'):
      newlines.extract()
    with open(raw_file, 'w') as file:
      file.write(str(soup))

def remove_newlines(raw_file):
  with open(raw_file, 'r') as file:
    html_content = file.read()
    soup = BeautifulSoup(html_content, 'html.parser')
    for newlines in soup.find_all('\n\n\n'):
      newlines.extract()
    with open(raw_file, 'w') as file:
      file.write(str(soup))


html_files = glob.glob('./**/*.html', recursive=True)
for file in html_files:
  uninstall(file)
  remove_newlines(file)

owl_files = glob.glob('./**/*.owl.js', recursive=True)
for file in owl_files:
  os.remove(file)