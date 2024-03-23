import subprocess, sys, uuid, requests, bcrypt

UNIQUE_PROJECT_ID = str(uuid.uuid4())

def process():
  subprocess.run(['python3', 'config.py', UNIQUE_PROJECT_ID])
  name, password = credentials()
  print("🛑 Please keep the project name and password for your records - you will be unable to access or change them later 🛑")
  subprocess.run(['python3', 'injector.py'])
  send_project_info(name, password)

def send_project_info(name, password):
  r = requests.post("http://localhost:3001/api/project/new", json={ 'projectId': UNIQUE_PROJECT_ID, "name": name, "password": password })
  print("Sending new project information to MIMIC server...")
  print(r.status_code, r.reason)
  print("MIMIC is successfully installed🔥") if r.status_code == 200 else print("💔There was an error installing MIMIC💔")
  
def credentials():
  unique_name = False
  while unique_name == False:
    name = name_credentials()
    r = requests.post("http://localhost:3001/api/project/validate", json={ "name": name })
    print(r.status_code, r.reason)
    if r.status_code == 200:
      unique_name = True
    else:
      print("A project with that name already exists. Please try again.")
  password = pw_credentials()
  return name, password

def name_credentials():
  prompt = "Please enter a project name for logging in, one word between 6 and 64 characters:"
  name = None
  valid_name = False
  while valid_name == False:
    print(prompt)
    name = input().lower()
    prompt, valid_name = validate_credentials(name, 6, 64)

  return name

def pw_credentials():
  prompt = "Please enter a password for logging in, between 8 and 64 characters"
  password = None
  valid_password = False
  while valid_password == False:
    print(prompt)
    password = input()
    prompt, valid_password = validate_credentials(password, 8, 64)

  password = password.encode()
  salt = bcrypt.gensalt() 
  return bcrypt.hashpw(password, salt).decode("utf-8")

def validate_credentials(entry, min, max):
  if len(entry) < min: 
    return(f'Please enter a value greater than {min} characters:', False)
  elif len(entry) > max:
    return(f'Please enter a value less than {max} characters:', False)
  elif " " in entry:
    return ('Please enter a value that contains no spaces:', False)
  else:
    return ('Valid entry', True)

if __name__ == '__main__':
  process()