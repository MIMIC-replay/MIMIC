export const epochToDate = (epoch) => {
  return new Date(epoch)
}

export const shorten = (id) => {
  return id.slice(0, 7).toUpperCase()
}

export const formatType = (typeNumber) => {
  return typeNumber
}