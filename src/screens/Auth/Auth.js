import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import {connect} from 'react-redux'

import startTabs from '../MainTabs/StartMainTabs'
import {
  DefaultInput,
  HeaderText,
  MainText,
  ButtonWithBackground
} from '../../components/UI'
import backgroundImage from '../../assets/background.jpg'
import validate from '../../utility/validation'
import {tryAuth} from '../../store/actions'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewMode:
        Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
      authMode: 'login',
      controls: {
        email: {
          value: '',
          valid: false,
          validationRules: {
            isEmail: true
          },
          touched: false
        },
        password: {
          value: '',
          valid: false,
          validationRules: {
            minLength: 6
          },
          touched: false
        },
        confirmPassword: {
          value: '',
          valid: false,
          validationRules: {
            equalTo: 'password'
          },
          touched: false
        }
      }
    }

    Dimensions.addEventListener('change', this.updateStyles)
  }

  componentWillUnmount = () => {
    Dimensions.removeEventListener('change', this.updateStyles)
  }

  switchAuthModeHadler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      }
    })
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    })
  }

  loginHandler = () => {
    const {controls} = this.state
    const authData = {
      email: controls.email.value,
      password: controls.password.value
    }
    this.props.onLogin(authData)
    startTabs()
  }

  updateInputState = (key, value) => {
    let connectedValue = {}
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo
      const equalValue = this.state.controls[equalControl].value
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      }
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      }
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === 'password'
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      }
    })
  }

  render() {
    const {viewMode, controls, authMode} = this.state
    let headingText = null
    let confirmPasswordControl = null

    if (viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeaderText>Please Log in</HeaderText>
        </MainText>
      )
    }
    if (authMode === 'signup') {
      confirmPasswordControl = (
        <View
          style={
            viewMode === 'portrait'
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput
            placeholder="Confirm Password"
            autoCapitalize="none"
            secureTextEntry
            style={styles.input}
            value={controls.confirmPassword.value}
            valid={controls.confirmPassword.valid}
            touched={controls.confirmPassword.touched}
            onChangeText={value =>
              this.updateInputState('confirmPassword', value)
            }
          />
        </View>
      )
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your Email Address"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={styles.input}
                value={controls.email.value}
                valid={controls.email.valid}
                touched={controls.email.touched}
                onChangeText={value => this.updateInputState('email', value)}
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
                    viewMode === 'portrait' || authMode === 'login'
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry
                    style={styles.input}
                    value={controls.password.value}
                    valid={controls.password.valid}
                    touched={controls.password.touched}
                    onChangeText={value =>
                      this.updateInputState('password', value)
                    }
                  />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.buttonsContainer}>
            <ButtonWithBackground
              color="#f47329"
              onPress={this.switchAuthModeHadler}
            >
              {`Switch to ${authMode === 'login' ? 'Sign Up' : 'login'}`}
            </ButtonWithBackground>
            <MainText>
              <Text>or</Text>
            </MainText>
            <ButtonWithBackground
              color="#29aaf4"
              onPress={this.loginHandler}
              disabled={
                (!controls.confirmPassword.valid && authMode === 'signup') ||
                !controls.email.valid ||
                !controls.password.valid
              }
            >
              Submit
            </ButtonWithBackground>
          </View>
        </KeyboardAvoidingView>
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

const mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(tryAuth(authData))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Auth)
