import subprocess, sys, uuid, requests, bcrypt

UNIQUE_PROJECT_ID = str(uuid.uuid4())

def process():
  backendUrl = getBackendLocation()
  subprocess.run(['python3', '-m', 'mimic_replay.config', UNIQUE_PROJECT_ID, backendUrl])
  name, password = credentials(backendUrl)
  print("🛑   Please keep the project name and password for your records  🛑")
  print("🛑 You will be unable to access or change your credentials later 🛑")
  subprocess.run(['python3', '-m', 'mimic_replay.injector'])
  send_project_info(name, password, backendUrl)

def getBackendLocation():
  print("🔹 Including the scheme, please provide the URL of your currently active MIMIC server:")
  backendUrl = input()
  if backendUrl.endswith('/'):
    backendUrl = backendUrl[:-1]
  print("🔹 Communicating with your MIMIC server...")
  try:
    r = requests.get(f'{backendUrl}/api/test/random')
  except:
    sys.exit("💔 There was an error connecting to your MIMIC server, installer unable to proceed 💔")
  print("🎉 Connection to MIMIC server successful 🎉")  
  return backendUrl  


def send_project_info(name, password, backendUrl):
  r = requests.post(f'{backendUrl}/api/project/new', json={ 'projectId': UNIQUE_PROJECT_ID, "name": name, "password": password })
  print("🔹 Sending new project information to MIMIC server...")
  if r.status_code == 200:
    print("🔹 Credentials received by MIMIC server!")
    print("🔥 MIMIC is successfully installed 🔥")
  else:
    print("💔 There was an error communicating with to your MIMIC server, installer unable to proceed 💔")
  
def credentials(backendUrl):
  unique_name = False
  while unique_name == False:
    name = name_credentials()
    r = requests.post(f'{backendUrl}/api/project/validate', json={ "name": name })
    if r.status_code == 200:
      unique_name = True
    else:
      print("🔹 A project with that name already exists. Please try again.")
  password = pw_credentials()
  return name, password

def name_credentials():
  prompt = "🔹 Please enter a project name for logging in, one word between 6 and 64 characters:"
  name = None
  valid_name = False
  while valid_name == False:
    print(prompt)
    name = input().lower()
    prompt, valid_name = validate_credentials(name, 6, 64)

  return name

def pw_credentials():
  prompt = "🔹 Please enter a password for logging in, between 8 and 64 characters:"
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
    return(f'🔹 Please enter a value greater than {min} characters:', False)
  elif len(entry) > max:
    return(f'🔹 Please enter a value less than {max} characters:', False)
  elif " " in entry:
    return ('🔹 Please enter a value that contains no spaces:', False)
  else:
    return ('🔹 Valid entry', True)

if __name__ == '__main__':
  process()