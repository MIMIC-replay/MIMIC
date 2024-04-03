
import { useEffect, useState } from "react"

import L from 'leaflet'

const Map = ({session}) => {
  const latitude = session.metadata.location.latitude
  const longitude = session.metadata.location.longitude

  useEffect(() => {
    let container = L.DomUtil.get('map');
    if(container != null){
      container._leaflet_id = null;
    }

    let map = L.map('map', {
      zoomControl: false,
    }).setView([latitude, longitude], 1);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);
  }, [latitude, longitude, session]);

  return (
    <div id="map">
    </div>
  )
}

export default Map