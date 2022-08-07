import type { NextPage } from 'next'
import {  useEffect, useState } from 'react';
import Map from '../components/Map';
import Resturent from '../components/Resturents';
import { _getCurrentLocationGPS, _getResturentsNearMe } from '../lib';
import {LocationType} from '../types'

const Home: NextPage = () => {
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState("")
  const [current, setCurrent] = useState<LocationType>();

  useEffect(() => {
    _getCurrentLocationGPS(setError, setLoader, setCurrent)
  }, [])

  if (current) {
    return (
      <div style={{display: "flex", justifyContent: "space-around"}}>
        <Map location={current}/>
        <Resturent location={current}/>
      </div >
    );
  }

  if (error && !loader) {
    return <div>{error}</div>
  }

  return <div> Wait...</div>
}

export default Home
