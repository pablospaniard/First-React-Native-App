import * as constants from '../actions/constants'
import placeImage from '../../assets/spain.jpg'

const initialState = {
  places: [],
  selectedPlace: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: String(Math.random()),
          name: action.placeName,
          image: placeImage
        })
      }
    case constants.DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== state.selectedPlace.key
        }),
        selectedPlace: null
      }
    case constants.SELECT_PLACE:
      return {
        ...state,
        selectedPlace: state.places.find(place => {
          return place.key === action.key
        })
      }
    case constants.DESELECT_PLACE:
      return {
        ...state,
        selectedPlace: null
      }
    default:
      return state
  }
}

export default reducer
