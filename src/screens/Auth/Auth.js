import React, {Component} from 'react'
import {View, Text, StyleSheet, ImageBackground, Dimensions} from 'react-native'

import startTabs from '../MainTabs/StartMainTabs'
import {
  DefaultInput,
  HeaderText,
  MainText,
  ButtonWithBackground
} from '../../components/UI'
import backgroundImage from '../../assets/background.jpg'

class Auth extends Component {
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

  loginHandler = () => {
    startTabs()
  }
  render() {
    const {viewMode} = this.state
    let headingText = null

    if (viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeaderText>Please Log in</HeaderText>
        </MainText>
      )
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your Email Address"
              style={styles.input}
            />
            <View
              style={
                viewMode === 'portrait'
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  viewMode === 'portrait'
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput placeholder="Password" style={styles.input} />
              </View>
              <View
                style={
                  viewMode === 'portrait'
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput
                  placeholder="Confirm Password"
                  style={styles.input}
                />
              </View>
            </View>
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
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '48%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  }
})

export default Auth
