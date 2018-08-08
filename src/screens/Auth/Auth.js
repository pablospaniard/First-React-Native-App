import React, {Component} from 'react'
import {View, Text, StyleSheet, ImageBackground} from 'react-native'

import startTabs from '../MainTabs/StartMainTabs'
import {
  DefaultInput,
  HeaderText,
  MainText,
  ButtonWithBackground
} from '../../components/UI'
import backgroundImage from '../../assets/background.jpg'

class Auth extends Component {
  loginHandler = () => {
    startTabs()
  }
  render() {
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <MainText>
            <HeaderText>Please Log in</HeaderText>
          </MainText>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your Email Address"
              style={styles.input}
            />
            <DefaultInput placeholder="Password" style={styles.input} />
            <DefaultInput placeholder="Confirm Password" style={styles.input} />
          </View>
          <View style={styles.buttonsContainer}>
            <ButtonWithBackground
              color="#f47329"
              onPress={() => {
                alert('Hello')
              }}
            >
              Switch to Login
            </ButtonWithBackground>
            <MainText>
              <Text>or</Text>
            </MainText>
            <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
              Submit
            </ButtonWithBackground>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default Auth
