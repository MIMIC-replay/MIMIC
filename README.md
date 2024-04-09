# MIMIC
## Description
MIMIC is an open source, self-hosted session replay framework which abstracts away the intricacies of recording and replaying users' sessions on web applications. It is tailored towards user experience improvement and debugging, providing granular insights into application malfunctions in a streamlined and cost-effective manner. With its ready-made telemetry pipeline, MIMIC automates instrumentation and deployment, providing an in depth replay interface that is intuitive and easy to learn. 

![Screenshot of MIMIC's frontend interface](https://lh3.googleusercontent.com/drive-viewer/AKGpihYeL0JI4xo0swcPIaJ5nXd-F8tkpPVbcnZcdDMnMX3fkXmZbDrEAKBWD-I5vvwDkKsS668LBd5bRpmbNC9y1PVpbq0X5bUYEmI=s1600-v0)

## Installation
MIMIC's setup involves two main steps:
1. Deploy MIMIC's telemetry pipeline to a host of your choice
2. Run MIMIC's command line tool to instrument your application

### Prerequisites
- `node` installed, 20.9.0 or greater
- `npm` installed, 10.3.0 or greater
- `python3` installed, 3.8.0 or greater
- `PostgreSQL` installed, with a user `postgres` and password of your choice
- An API token from `https://findip.net/`
- [Redis](https://redis.io/) host, port, and password
- [AWS S3 Bucket](https://aws.amazon.com/s3/) dedicated to this project
- Clone the MIMIC repository to your machine

### Installation of MIMIC server and client
#### Server(Backend)
- Navigate to `./MIMIC/backend`
- Run `npm install`
- While still in the backend root file, create a `.env` file, with all information indicated by `./utils/config.js`
- Navigate to `./models`, following the instruction in the `initialize.sql` file to initialize your database
- Run the server with `npm start`

####  
