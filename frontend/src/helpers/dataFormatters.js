import { totalDuration } from "./dataExtractors"

export const epochToDate = (epoch) => {
  return new Date(epoch)
}

export const shorten = (id) => {
  return String(id).slice(0, 7).toUpperCase()
}

export const formatType = (typeNumber) => {
  return typeNumber
}

export const isLoaded = (timeString, session) => {
  // timestring must not be negative
  // timestring must not be greater than the session's total duration
  const sessionDuration = totalDuration(session)

  return !timeString.includes('-') && isTimeWithinSession(timeString, sessionDuration)
}

const isTimeWithinSession = (timeA, timeB) => {
  // Splitting time strings into hours and minutes
  const [hoursA, minutesA] = timeA.split(":").map(Number);
  const [hoursB, minutesB] = timeB.split(":").map(Number);

  // Comparing hours
  if (hoursA < hoursB) {
      return true;
  } else if (hoursA === hoursB) {
      // If hours are equal, comparing minutes
      if (minutesA <= minutesB) {
          return true;
      }
  }
  return false;
}