import React, {Component} from 'react'
import {View, Button, StyleSheet, ScrollView, Image} from 'react-native'
import {connect} from 'react-redux'

import * as actions from '../../store/actions'
import {HeaderText, MainText} from '../../components/UI'
import {InputComponent, PickImage, PickLocation} from '../../components'

class SharePlace extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }
  constructor(props) {
    super(props)

    this.state = {
      placeName: ''
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress' && event.id === 'sideDrawerToggle') {
      this.props.navigator.toggleDrawer({
        side: 'left'
      })
    }
  }

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    })
  }

  placeAddedHandler = () => {
    if (this.state.placeName.trim() !== '') {
      this.props.onAddPlace(this.state.placeName)
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeaderText> Share a Place with us!</HeaderText>
          </MainText>
          <PickImage />
          <PickLocation />
          <InputComponent
            placeName={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button title="Share the place!" onPress={this.placeAddedHandler} />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  button: {
    margin: 8
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: placeName => dispatch(actions.addPlace(placeName))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SharePlace)
