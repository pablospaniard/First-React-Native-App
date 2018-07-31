import React from 'react'
import {StyleSheet, View} from 'react-native'

import {ListItem, InputComponent, ListComponent} from './src/components'

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
        places: prevState.places.concat(prevState.placeName),
        placeName: ''
      }
    })
  }

  onItemPressed = index => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter((place, i) => {
          return i !== index
        })
      }
    })
  }

  render() {
    const placesOutput = this.state.places.map((place, i) => (
      <ListItem
        key={i}
        placeName={place}
        onItemPressed={() => this.onItemPressed(i)}
      />
    ))
    return (
      <View style={styles.container}>
        <InputComponent
          placeName={this.state.placeName}
          onPlaceNameHandler={this.placeNameChangeHandler}
          onPlaceSubmitHandler={this.placeSubmitHandler}
        />
        <ListComponent placesOutput={placesOutput} />
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
