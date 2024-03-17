
import { useState, useEffect, useRef } from "react"
import { getLatLon } from "../../services/map"

import L from 'leaflet'

const Map = ({session}) => {

  // return null

  const [latLon, setLatLon] = useState(null)
  // const mapRef = useRef(null)

  useEffect(() => {
    // const city = session.metadata.location.match(/^[\w ]+/)[0]
    const city = 'Valencia'
    getLatLon(city)
      .then(r =>setLatLon(r))
      .catch(e => console.log(e))
  }, [session])

  useEffect(() => {
    if (!latLon || document.querySelector('.leaflet-container')) return

    let map = L.map('map', {
      zoomControl: false,
      // attributionControl: false,
    }).setView(latLon, 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker(latLon).addTo(map);

  }, [latLon]); // 

  return (
    <div id="map" style={{ height: '180px' }}>
      {latLon}
    </div>
  )
}

export default Map