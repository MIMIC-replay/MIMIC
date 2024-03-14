import { epochToDate } from "./dateFormatters"

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

export const requestDataExtractor = (request) => {

  const data = request.data

  const time = String(epochToDate(request.timestamp)).slice(0, 24)
  const type = data.type
  const latency = data.latency
  const url = data.url.slice(0, 50)
  const responseStatus = data.status

  return {
    time,
    type,
    latency,
    url,
    responseStatus
  }
}

