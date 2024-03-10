from bs4 import BeautifulSoup, Comment
import glob

# This function:
## 1. takes an html file as an argument (raw_file)
## 2. prevents the injection from repeating if it's already been run
## 3. parses html file into a special soup object via the BeautifulSoup library, 
##      which provides an interface to manipulate html files easily
## 4. we create a new html <script> element called `rrweb_script`
## 5. we set a `src` attribute in that script element with a value of the URL that contains
##      the rrweb code, enabling use to use it in our script (will add the object rrweb to `window`)
## 6. we set the `class` attribute to 'Owl' so we can easily uninstall what we inject
## 7. we create a new html <script> element called `owl_script`
## 8. we set a `src` attribute in that script element with a value of `./script.owl.js`
##      which is the file that we just created dynamically (see file `config.py`)
##      this file will contain our script
## 9. we set the `class` attribute to 'Owl' so we can easily uninstall what we inject
## 10. The actual injection in the <head> element of the html file, via the soup interface:
##     11. we inject a comment to mark the start point of the injection
##     12. we inject the rrweb and the owl scripts
##     13. we add new line characters in between to make it pretty and readable
##     14. we inject a comment to mark the end point of the injection
## 15. The injection has taken place. Now we only have to overwrite the old html content with the
##       the new content, the one that contains the injected scripts
## 16. We do this to all html files within the target application, recursively.

def inject_scripts(raw_file):
  with open(raw_file, 'r') as file: # 1
    html_content = file.read()
    if "Owl Start" in html_content: #2
      return

    # the BeautifulSoup constructor takes two arguments:
    ##  - the html file
    ##  - the parser. There are other 3. This is the best we can use now
    soup = BeautifulSoup(html_content, 'html.parser') # 3

    rrweb_script = soup.new_tag('script') # 4
    rrweb_script['src'] = "https://cdn.jsdelivr.net/npm/rrweb@latest/dist/record/rrweb-record.min.js" # 5
    rrweb_script['class'] = 'Owl' # 6

    owl_script = soup.new_tag('script') # 7
    owl_script['src'] = "./script.owl.js" # 8
    owl_script['class'] = 'Owl' # 9

    soup.head.extend([ # 10
      Comment('Owl Start'),  # 11 
      '\n',
      rrweb_script, # 12
      '\n',
      owl_script,   
      '\n',         # 13
      Comment('Owl End'),    # 14
      '\n'
    ])

    with open(raw_file, 'w') as file: # 15
      file.write(str(soup))  

## Function for testing/learning purposes
def create_js():
  with open('./hoot.owl.js', 'w') as file:
    file.write("console.log('Hoot hoot motherbeaker!')")

files = glob.glob('./**/*.html', recursive=True) # 16
for file in files:
  inject_scripts(file)

# create_js()