from bs4 import BeautifulSoup, Comment
import glob, os

# This script follows the inverse process of install_scripts (see ./injector.py):
##    1. It opens the html file
##    2. it parses html file into a special soup object via the BeautifulSoup library, 
##         which provides an interface to manipulate html files easily
##    3. It removes every script with the class attribute of 'Owl' (so it only removes
##         what we added)
##    4. It removes every comment with the word 'Owl' (the ones we added)
##    5. It removes any redundant newline characters.
##    6. It overwrites the html content, thus restoring it to its old state.
##    7. Finally, it removes any .owl.js file.

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