-- To get started: 
  -- command line: psql postgres
    -- postgres-# CREATE DATABASE mimic;
    -- postgres-# \c mimic
    -- postgres-# exit
  -- command line: psql -d mimic < initialize.sql

CREATE TABLE projects (
  id UUID PRIMARY KEY,
  created_at timestamp NOT NULL DEFAULT NOW(),
  name varchar(64) NOT NULL,
  password_hash varchar(72) NOT NULL
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  session_start timestamp NOT NULL DEFAULT NOW(),
  session_end timestamp,
  url varchar(100), 
  ip_address varchar(39),
  city varchar(30),
  region varchar(30),
  country varchar(30),
  os_name varchar(20),
  os_version varchar(20),
  browser_name varchar(20),
  browser_version varchar(20),
  https_protected boolean,
  timezone varchar(30),
  longitude FLOAT,
  latitude FLOAT
);