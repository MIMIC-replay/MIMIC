
import { useEffect } from "react"

import L from 'leaflet'

const Map = ({session}) => {

  const latitude = session.metadata.location.latitude
  const longitude = session.metadata.location.longitude

  useEffect(() => {
    if (document.querySelector('.leaflet-container')) return

    let map = L.map('map', {
      zoomControl: false,
    }).setView([latitude, longitude], 1);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);

  }, [latitude, longitude]);

  return (
    <div id="map"></div>
  )
}

export default Map