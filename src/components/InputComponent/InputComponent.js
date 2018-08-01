import React from 'react'
import {View, TextInput, Button, StyleSheet} from 'react-native'

class InputComponent extends React.Component {
  state = {
    placeName: ''
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
    this.props.onPlaceAdded(this.state.placeName)
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="An Awesome Place"
          value={this.state.placeName}
          onChangeText={this.placeNameChangeHandler}
        />
        <Button
          title="Add"
          style={styles.inputButton}
          onPress={this.placeSubmitHandler}
        />
      </View>
    )
  }
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

export default InputComponent
