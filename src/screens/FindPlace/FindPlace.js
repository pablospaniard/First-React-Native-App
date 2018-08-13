import React, {Component} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Animated} from 'react-native'
import {connect} from 'react-redux'

import {ListComponent} from '../../components'

class FindPlace extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    addAnim: new Animated.Value(0)
  }

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

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      })
      this.placesLoadedHandler()
    })
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.addAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
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
    const {placesLoaded, removeAnim, addAnim} = this.state
    let content = (
      <Animated.View
        style={{
          opacity: removeAnim,
          transform: [
            {
              scale: removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )
    if (placesLoaded) {
      content = (
        <Animated.View
          style={{
            opacity: addAnim,
            transform: [
              {
                scale: addAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 1]
                })
              }
            ]
          }}
        >
          <ListComponent
            places={this.props.places}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      )
    }
    return (
      <View style={placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

export default connect(
  mapStateToProps,
  null
)(FindPlace)
