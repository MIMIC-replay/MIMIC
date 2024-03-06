import subprocess, sys

def process():
  subprocess.run(['echo', "Hoot Hoot!"])
  # subprocess.run(['touch', 'evil.c'])
  print(sys.argv[1])

if __name__ == '__main__':
  process()