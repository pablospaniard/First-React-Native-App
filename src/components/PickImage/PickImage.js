import React, {Component} from 'react'
import {View, Image, Button, StyleSheet} from 'react-native'

import imagePicture from '../../assets/spain.jpg'

class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={imagePicture} style={styles.image} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={() => alert('test')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8
  },
  image: {
    width: '100%',
    height: '100%'
  },
  container: {
    width: '100%',
    alignItems: 'center'
  }
})

export default PickImage
