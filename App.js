import React from 'react'
import {StyleSheet, View} from 'react-native'

import {InputComponent, ListComponent, DetailComponent} from './src/components'
import placeImage from './src/assets/spain.jpg'

export default class App extends React.Component {
  state = {
    placeName: '',
    places: [],
    selectedPlace: null
  }

  placeNameChangeHandler = value => {
    this.setState({
      placeName: value
    })
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === '') {
      return
    }
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: String(Math.random()),
          name: prevState.placeName,
          image: placeImage
        }),
        placeName: ''
      }
    })
  }

  onItemDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key
        }),
        selectedPlace: null
      }
    })
  }

  onModalClosedHandler = () => {
    this.setState({
      selectedPlace: null
    })
  }

  onItemSelected = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          return place.key === key
        })
      }
    })
    // this.setState(prevState => {
    //   return {
    //     places: prevState.places.filter(place => {
    //       return place.key !== key
    //     })
    //   }
    // })
  }

  render() {
    return (
      <View style={styles.container}>
        <DetailComponent
          selectedPlace={this.state.selectedPlace}
          onModalClosed={this.onModalClosedHandler}
          onItemDeleted={this.onItemDeletedHandler}
        />
        <InputComponent
          placeName={this.state.placeName}
          onPlaceNameHandler={this.placeNameChangeHandler}
          onPlaceSubmitHandler={this.placeSubmitHandler}
        />
        <ListComponent
          places={this.state.places}
          onItemSelected={this.onItemSelected}
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
