// import { epochToDate } from "./dateFormatters"

export const sessionMetadataExtractor = (session) => {
  
  const id = session.id
  const metadata = session.metadata

  const url = metadata.url.slice(0, 50)
  const time = metadata.date
  const viewport = metadata.viewport
  const https = metadata.https
  const location = metadata.location
  const os = metadata.os

  return {
    id,
    url,
    time,
    viewport,
    https,
    location,
    os,
  }
}

export const requestDataExtractor = (request, session) => {
  const data = request.data

  // const time = String(epochToDate(request.timestamp)).slice(0, 24)
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

export const errorTrigger = (error) => {
  const triggerMatch = error.data.payload.trace[0].match(/^(.+) /)[1]
  return triggerMatch
}

export const line = (error) => {
  const errorLineMatch = error.data.payload.trace[0].match(/(\d+:\d+)\)$/)[1]
  return errorLineMatch
}

