export const epochToDate = (epoch) => {
  return new Date(epoch)
}

export const short = (id) => {
  // 986953cc-b0d6-4a54-a026-0bad9a629656
  return id.slice(0, 7).toUpperCase()
}