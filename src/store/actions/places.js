import * as constants from './constants'

export const addPlace = placeName => {
  return {
    type: constants.ADD_PLACE,
    placeName
  }
}

export const deletePlace = key => {
  return {
    type: constants.DELETE_PLACE,
    placeKey: key
  }
}
