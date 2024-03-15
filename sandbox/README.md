# rrweb-demo:

1. `targetApp` is the application in which we want to record user sessions.
2. `server` is our backend application to send and retrieve recordings from.
3. `client` is our frontend application to display these sessions.

Navigate to each directory, run `npm install`.

# Testing:

1.  begin by navigating to `server` and running `npm run start` to start the express server to listen for events sent from `targetApp`.
2.  navigate to `targetApp` and run `npm run dev` to begin the target application, as you interact with it, you should see the events being logged to the express server, at the moment this is setup to send events every 10 seconds, and immediately upon session being terminated (x out of tab). Can reopen tab at later time, and session replayer will consider that "inactive time".
3.  With express server still running (as currently data is held in memory), navigate to `client` directory and run `npm run dev` to open the sample frontend application. Click the button to fetch the data from the backend and display it on screen.

# Considerations:

I probably have a lot of unnecessary code in there at the moment, and this only records a singular user's sessions at the moment, concatenating them into one session.
