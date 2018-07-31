import React from 'react'
import {View, TextInput, Button, StyleSheet} from 'react-native'

const inputComponent = props => {
  const {placeName, onPlaceNameHandler, onPlaceSubmitHandler} = props
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="An Awesome Place"
        value={placeName}
        onChangeText={onPlaceNameHandler}
      />
      <Button
        title="Add"
        style={styles.inputButton}
        onPress={onPlaceSubmitHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '70%'
  },
  inputButton: {
    width: '30%'
  }
})

export default inputComponent
