import React from 'react'

import {DefaultInput} from '../UI'

const inputComponent = props => {
  return (
    <DefaultInput
      placeholder="Place Name"
      value={props.placeName}
      onChangeText={props.onChangeText}
    />
  )
}

export default inputComponent
