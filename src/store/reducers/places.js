import * as constants from '../actions/constants'
import placeImage from '../../assets/spain.jpg'

const initialState = {
  places: []
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
          return place.key !== action.placeKey
        })
      }
    default:
      return state
  }
}

export default reducer
