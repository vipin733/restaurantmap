import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { LocationType, MarkerType, ResturentType } from "../types";


const _getLocationError = (error: GeolocationPositionError, setError: Dispatch<SetStateAction<string>>) => {
    let errorCode = ""
    switch(error.code) {
      case error.PERMISSION_DENIED:
        errorCode = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        errorCode = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        errorCode = "The request to get user location timed out."
        break;
      default:
        errorCode = "An unknown error occurred."
        break;
    }
    setError(errorCode)
}


const _getLocation = (e: GeolocationPosition, setCurrent: Dispatch<SetStateAction<LocationType | undefined>>) => {
    setCurrent({
        lat: e.coords.latitude,
        lng: e.coords.longitude
    });
}

export const _getCurrentLocationGPS = (setError: Dispatch<SetStateAction<string>>, setLoader: Dispatch<SetStateAction<boolean>>,  setCurrent: Dispatch<SetStateAction<LocationType | undefined>>) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(e => _getLocation(e, setCurrent), error => _getLocationError(error, setError));
    } else {
        setLoader(false);
        setError("Geolocation is not supported by this browser.");
    }
}

export const _getResturentsNearMe = async (location: LocationType | undefined, setMarkers: Dispatch<SetStateAction<MarkerType[]>>, setLoader: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<string>>) => {
    try {
        let url = window.location.href + "api/resturents-near-me";
        let response = await axios.post(url, location);
        setMarkers(response.data);
        setLoader(false);
    } catch (error) {
        setLoader(false);
        setError("server error");
        console.log(error);
    }
}

export const _getResturents = async (location: LocationType | undefined, setResturents: Dispatch<SetStateAction<ResturentType[] | undefined>>) => {
    try {
        let url = window.location.href + "api/resturents";
        let response = await axios.post(url, location);
        setResturents(response.data);
    } catch (error) {
        console.log(error);
    }
}