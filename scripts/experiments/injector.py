from bs4 import BeautifulSoup
import glob

def install(raw_file):
  with open(raw_file, 'r') as file:
    html_content = file.read()
    soup = BeautifulSoup(html_content, 'html.parser')
    script_element = soup.new_tag('script')
    script_element['src'] = "Hi Lucas!"
    script_element['class'] = 'Owl'
    soup.head.extend([script_element, '\n'])
    with open(raw_file, 'w') as file:
      file.write(str(soup))  

files = glob.glob('./**/*.html', recursive=True)
for file in files:
  install(file)