import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import {connect} from 'react-redux'

import * as actions from '../../store/actions'
import Icon from 'react-native-vector-icons/Ionicons'

class DetailComponent extends Component {
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key)
    this.props.navigator.pop()
  }
  render() {
    const {selectedPlace} = this.props
    return (
      <View style={styles.container}>
        <View>
          <Image source={selectedPlace.image} style={styles.placeImage} />
          <Text style={styles.placeName}>{selectedPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon
                size={30}
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                color="red"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(actions.deletePlace(key))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DetailComponent)
