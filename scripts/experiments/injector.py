from bs4 import BeautifulSoup, Comment
import glob

# This function:
## 1. takes an html file as an argument (raw_file)
## 2. parses html file into a special soup object via the BeautifulSoup library, 
##      which provides an interface to manipulate html files easily
## 3. we create a new html <script> element called `rrweb_script`
## 4. we set a `src` attribute in that script element with a value of the URL that contains
##      the rrweb code, enabling use to use it in our script (will add the object rrweb to `window`)
## 5. we set the `class` attribute to 'Owl' so we can easily uninstall what we inject
## 6. we create a new html <script> element called `owl_script`
## 7. we set a `src` attribute in that script element with a value of `./script.owl.js`
##      which is the file that we just created dynamically (see file `config.py`)
##      this file will contain our script
## 8. we set the `class` attribute to 'Owl' so we can easily uninstall what we inject
## 9. The actual injection in the <head> element of the html file, via the soup interface:
##     10. we inject a comment to mark the start point of the injection
##     11. we inject the rrweb and the owl scripts
##     12. we add new line characters in between to make it pretty and readable
##     13. we inject a comment to mark the end point of the injection
## 14. The injection has taken place. Now we only have to overwrite the old html content with the
##       the new content, the one that contains the injected scripts
## 15. We do this to all html files within the target application, recursively.

def inject_scripts(raw_file):
  with open(raw_file, 'r') as file: # 1
    html_content = file.read()

    # the BeautifulSoup constructor takes two arguments:
    ##  - the html file
    ##  - the parser. There are other 3. This is the best we can use now
    soup = BeautifulSoup(html_content, 'html.parser') # 2

    rrweb_script = soup.new_tag('script') # 3
    rrweb_script['src'] = "https://cdn.jsdelivr.net/npm/rrweb@latest/dist/record/rrweb-record.min.js" # 4
    rrweb_script['class'] = 'Owl' # 5

    owl_script = soup.new_tag('script') # 6
    owl_script['src'] = "./script.owl.js" # 7
    owl_script['class'] = 'Owl' # 8

    soup.head.extend([ # 9
      Comment('Owl Start'),  # 10 
      '\n',
      rrweb_script, # 11
      '\n',
      owl_script,   
      '\n',         # 12
      Comment('Owl End'),    # 13
      '\n'
    ])

    with open(raw_file, 'w') as file: # 14
      file.write(str(soup))  

## Function for testing/learning purposes
def create_js():
  with open('./hoot.owl.js', 'w') as file:
    file.write("console.log('Hoot hoot motherbeaker!')")

files = glob.glob('./**/*.html', recursive=True) # 15
for file in files:
  inject_scripts(file)

# create_js()