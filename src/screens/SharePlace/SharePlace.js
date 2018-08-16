import React, {Component} from 'react'
import {View, Button, StyleSheet, ScrollView, Image} from 'react-native'
import {connect} from 'react-redux'

import * as actions from '../../store/actions'
import {HeaderText, MainText} from '../../components/UI'
import {InputComponent, PickImage, PickLocation} from '../../components'
import validate from '../../utility/validation'

class SharePlace extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }
  constructor(props) {
    super(props)

    this.state = {
      controls: {
        placeName: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        }
      }
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
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      }
    })
  }

  placeAddedHandler = () => {
    if (this.state.controls.placeName.value.trim() !== '') {
      this.props.onAddPlace(this.state.controls.placeName.value)
    }
  }
  render() {
    const {controls} = this.state
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeaderText> Share a Place with us!</HeaderText>
          </MainText>
          <PickImage />
          <PickLocation />
          <InputComponent
            placeData={controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button
              title="Share the place!"
              onPress={this.placeAddedHandler}
              disabled={!controls.placeName.valid}
            />
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
