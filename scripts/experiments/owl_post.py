import subprocess, sys

def process():
  subprocess.run(['python3', 'config.py'])
  subprocess.run(['node', 'post_data.owl.js'])
  subprocess.run(['echo', "Hoot hoot motherbeaker!"])

if __name__ == '__main__':
  process()