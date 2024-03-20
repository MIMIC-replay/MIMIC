import { epochToDate } from "./dataFormatters"

export const sessionMetadataExtractor = (session) => {
  
  const id = session.id
  const metadata = session.metadata

  const url = metadata.url
  const time = metadata.date
  const https = metadata.https
  const os = metadata.os
  const ip = metadata.ip
  const browser = metadata.browser
  
  const location = metadata.location

  const city = location.city
  const region = location.region
  const country = location.country
  const longitude = location.longitude
  const latitude = location.latitude
  const timezone = location.timezone

  return {
    id,
    url,
    time,
    browser,
    https,
    os,
    ip,
    city,
    region,
    country,
    longitude,
    latitude,
    timezone
  }
}

export const requestDataExtractor = (request, session) => {
  const data = request.data

  const time = relativeTime(request, session)
  const type = data.type
  const method = data.method
  const latency = data.latency
  const url = data.url.slice(0, 50)
  const responseStatus = data.status

  return {
    time,
    type,
    method,
    latency,
    url,
    responseStatus
  }
}

export const relativeTime = (event, session) => {
  const initialTimestamp = session.events[0].timestamp
  const timestamp = event.timestamp

  const relativeSeconds = (timestamp - initialTimestamp) / 1000
  return formatTime(relativeSeconds)
}

// Function to convert seconds to the formatted time string (mm:ss)
export const formatTime = (seconds) => {
  const roundedSeconds = Math.floor(seconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;

  // Pad minutes and seconds with zeros
  const paddedMinutes = padWithZeros(minutes, 2);
  const paddedSeconds = padWithZeros(remainingSeconds, 2);
  return `${paddedMinutes}:${paddedSeconds}`;
};

const padWithZeros = (number, length) => {
  let str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
};

export const errorDataExtractor = (error) => {
  return {
    trigger: errorTrigger(error),
    time: epochToDate(error.timestamp),
    trace: error.data.payload.trace,
  }
}

export const errorTrigger = (error) => {
  const triggerMatch = error.data.payload.trace[0].match(/^(.+) /)[1]
  return triggerMatch
}

export const line = (error) => {
  const errorLineMatch = error.data.payload.trace[0].match(/(\d+:\d+)\)$/)[1]
  return errorLineMatch
}

