import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'
import { MarkerType } from '../../types'


  /**
   * @method resturents-near-me
   * @param {LocationType} locationType
   * @returns {MarkerType[]} markers
   * @description find resturents lat and and name  by lat and lng
  */

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MarkerType[]>
) {
  
  let markers: MarkerType[] = []
  try {
    let {lat, lng} = req.body

    if (!lat || !lng) {
      return res.status(200).json(markers)
    }

    for (let index = 0; index < 1; index++) {
      let address  = faker.address
      let maxLat  = parseInt(lat) + 1
      let minLat  = parseInt(lat) - 1

      let maxLng  = parseInt(lng) + 1
      let minLng  = parseInt(lng) - 1

      let resturent: MarkerType = {
        title: `${address.buildingNumber()} ${address.cityName()}`,
        lat: parseFloat(address.latitude(maxLat, minLat)),
        lng: parseFloat(address.longitude(maxLng, minLng))
      }
      markers.push(resturent);
    }

    return res.status(200).json(markers)
  } catch (error) {
    return res.status(200).json(markers)
  }
  
}
