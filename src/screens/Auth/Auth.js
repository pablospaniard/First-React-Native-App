import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'

import startTabs from '../MainTabs/StartMainTabs'

class Auth extends Component {
  loginHandler = () => {
    startTabs()
  }
  render() {
    return (
      <View>
        <Text>Auth Screen</Text>
        <Button title="Login" onPress={this.loginHandler} />
      </View>
    )
  }
}

export default Auth
