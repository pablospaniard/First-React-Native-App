import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'

import {InputComponent} from '../../components'
import * as actions from '../../store/actions'

class SharePlace extends Component {
  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress' && event.id === 'sideDrawerToggle') {
      this.props.navigator.toggleDrawer({
        side: 'left'
      })
    }
  }

  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName)
  }
  render() {
    return (
      <View>
        <InputComponent onPlaceAdded={this.placeAddedHandler} />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: placeName => dispatch(actions.addPlace(placeName))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SharePlace)
