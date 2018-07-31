import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'

const listComponent = props => (
  <ScrollView style={styles.listContainer}>{props.placesOutput}</ScrollView>
)

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
})

export default listComponent
