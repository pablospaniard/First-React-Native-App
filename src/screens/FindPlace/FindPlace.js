import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'

import {ListComponent} from '../../components'

class FindPlace extends Component {
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

  itemSelectedHandler = key => {
    const selectedPlace = this.props.places.find(place => {
      return place.key === key
    })
    this.props.navigator.push({
      screen: 'awesome-places.PlaceDetail',
      title: selectedPlace.name,
      passProps: {
        selectedPlace
      }
    })
  }
  render() {
    return (
      <View>
        <ListComponent
          places={this.props.places}
          onItemSelected={this.itemSelectedHandler}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

export default connect(
  mapStateToProps,
  null
)(FindPlace)
