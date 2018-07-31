import React from 'react'
import {StyleSheet, View} from 'react-native'

import {InputComponent, ListComponent} from './src/components'

export default class App extends React.Component {
  state = {
    placeName: '',
    places: []
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
          key: Math.random(),
          value: prevState.placeName
        }),
        placeName: ''
      }
    })
  }

  onItemDeleted = key => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== key
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <InputComponent
          placeName={this.state.placeName}
          onPlaceNameHandler={this.placeNameChangeHandler}
          onPlaceSubmitHandler={this.placeSubmitHandler}
        />
        <ListComponent
          places={this.state.places}
          onItemDeleted={this.onItemDeleted}
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
