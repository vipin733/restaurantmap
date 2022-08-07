import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from 'react';
import Marker from '../components/Marker';
import { _getCurrentLocationGPS, _getResturentsNearMe } from '../lib';
import {MarkerType} from '../types'

const Map = ({location} :any) => {
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState("")
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  useEffect(() => {
    _getResturentsNearMe(location, setMarkers, setLoader, setError)
  }, [])

  if (loader) {
    return <div> Wait...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div style={{ height: '100vh', width: '70%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: `${process.env.NEXT_PUBLIC_MAP_KEY}` }}
        defaultCenter={location}
        defaultZoom={11}
      >
        {
          markers.map((marker, index) => {
            return (
              <Marker
                key={index}
                lat={marker.lat}
                lng={marker.lng}
                name={marker.title}
                color="blue"
              />
            )
          })
        }
      </GoogleMapReact>
    </div>
  );
}

export default Map
