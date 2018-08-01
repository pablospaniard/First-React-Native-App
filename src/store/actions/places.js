import * as constants from './constants'

export const addPlace = placeName => {
  return {
    type: constants.ADD_PLACE,
    placeName
  }
}

export const deletePlace = () => {
  return {
    type: constants.DELETE_PLACE
  }
}

export const selectPlace = key => {
  return {
    type: constants.SELECT_PLACE,
    key
  }
}

export const deselectPlace = () => {
  return {
    type: constants.DESELECT_PLACE
  }
}
