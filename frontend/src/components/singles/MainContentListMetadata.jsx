const MainContentListMetadata = ({session}) => {
  const metadata = session.metadata

  const id = session.id
  const appName = metadata.url
  const time = metadata.date
  const viewport = metadata.viewport
  const https = metadata.https
  const location = metadata.location
  const os = metadata.os

  return (
    <ul>
        <li>{`#${id}`}</li>
        <li>{appName}</li>
        <li>{time}</li>
        <li>{location}</li>
        <li>{`${os.name} ${os.version}`}</li>
        <li>{`${viewport.width} ${viewport.height}`}</li>
        <li>{`https: ${https}`}</li>
    </ul>
  )
} 

export default MainContentListMetadata