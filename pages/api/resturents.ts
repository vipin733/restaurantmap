import type { NextApiRequest, NextApiResponse } from 'next'
import { faker } from '@faker-js/faker';
import { ResturentType } from '../../types'

 /**
   * @method resturentLocationSearch
   * @param {LocationType} locationType
   * @returns {ResturentType[]} resturents
   * @description find resturents by lat and lng
  */

export default function resturentLocationSearch(
  req: NextApiRequest,
  res: NextApiResponse<ResturentType[]>
) {

  let resturents: ResturentType[] = []
  try {
    let {lat, lng} = req.body
    if (!lat || !lng) {
      return res.status(200).json(resturents)
    }

    for (let index = 0; index < 10; index++) {
      let address  = faker.address
      let resturent: ResturentType = {
        title: `${address.cityName()} ${address.cityName()}`,
        address: `${address.buildingNumber()}, ${address.city()}, ${address.cityName()}, ${address.country()}`
      }
      resturents.push(resturent);
    }
    return res.status(200).json(resturents)
  } catch (error) {
    return res.status(200).json(resturents)
  }
  
}
