import React from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'

import {InputComponent, ListComponent, DetailComponent} from './src/components'
import {
  addPlace,
  deletePlace,
  selectPlace,
  deselectPlace
} from './src/store/actions/places'

class App extends React.Component {
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName)
    console.log('Place added')
  }

  onPlaceDeletedHandler = () => {
    this.props.onDeletePlace()
  }

  onModalClosedHandler = () => {
    this.props.onDeselectPlace()
  }

  onPlaceSelected = key => {
    this.props.onSelectPlace(key)
  }

  render() {
    return (
      <View style={styles.container}>
        <DetailComponent
          selectedPlace={this.props.selectedPlace}
          onModalClosed={this.onModalClosedHandler}
          onItemDeleted={this.onPlaceDeletedHandler}
        />
        <InputComponent onPlaceAdded={this.placeAddedHandler} />
        <ListComponent
          places={this.props.places}
          onItemSelected={this.onPlaceSelected}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: name => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: key => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
