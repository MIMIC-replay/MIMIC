-- To get started: 
  -- command line: psql postgres
    -- postgres-# CREATE DATABASE mimic;
    -- postgres-# \c mimic
    -- postgres-# exit
  -- command line: psql -d mimic < initialize.sql

DROP TABLE IF EXISTS projects CASCADE; -- might want to remove lines 7-10 in deployment so we can't easily nuke all our data
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS projects_admins CASCADE;

CREATE TABLE projects (
  id serial PRIMARY KEY,
  created_at timestamp NOT NULL DEFAULT NOW(),
  last_session timestamp -- can be null as when the project is created there won't be any sessions yet
);

CREATE TABLE sessions (
  id serial PRIMARY KEY,
  -- project_id integer NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  session_data bytea NOT NULL--, --compressed blob data
  -- session_start timestamp NOT NULL DEFAULT NOW(),
  -- session_end timestamp NOT NULL DEFAULT NOW(),
  -- has_rage_clicks boolean NOT NULL,
  -- has_errors boolean NOT NULL,
  -- ip_address varchar(39), -- will we always be able to get the ip/all the below info? currently can be null
  -- city varchar(30),
  -- region varchar(30),
  -- country varchar(30),
  -- os_name varchar(20),
  -- os_version varchar(20),
  -- browser_name varchar(20),
  -- browser_version varchar(20)
);

CREATE TABLE admins (
  id serial PRIMARY KEY,
  username varchar(20) NOT NULL,
  first_name varchar(20) NOT NULL, -- do we want to limit this info in the beginning
  last_name varchar(20) NOT NULL,
  email varchar(320) NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE projects_admins (
  project_id integer NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  admin_id integer NOT NULL REFERENCES admins(id) ON DELETE CASCADE
);