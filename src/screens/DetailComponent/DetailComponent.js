import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native'
import {connect} from 'react-redux'

import * as actions from '../../store/actions'
import Icon from 'react-native-vector-icons/Ionicons'

class DetailComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
    }

    Dimensions.addEventListener('change', this.updateStyles)
  }

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this.updateStyles)
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    })
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key)
    this.props.navigator.pop()
  }
  render() {
    const {selectedPlace} = this.props
    const {viewMode} = this.state
    return (
      <View
        style={[
          styles.container,
          viewMode === 'portrait'
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
        <View style={styles.subContainer}>
          <Image source={selectedPlace.image} style={styles.placeImage} />
        </View>
        <View style={styles.subContainer}>
          <View>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: 'column'
  },
  landscapeContainer: {
    flexDirection: 'row'
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
  },
  subContainer: {
    flex: 1
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
