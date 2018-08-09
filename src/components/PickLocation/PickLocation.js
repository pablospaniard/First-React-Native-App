import React, {Component} from 'react'
import {View, Button, StyleSheet} from 'react-native'

import {MainText} from '../../components/UI'

class PickLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <MainText>Map</MainText>
        </View>
        <View style={styles.button}>
          <Button title="Locate" onPress={() => alert('test')} />
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
  container: {
    width: '100%',
    alignItems: 'center'
  }
})

export default PickLocation
