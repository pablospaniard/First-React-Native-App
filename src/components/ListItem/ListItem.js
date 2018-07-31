import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'

const listItem = props => (
  <TouchableOpacity onPress={props.onItemDeleted}>
    <View style={styles.listItem}>
      <Text>{props.placeName}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    padding: 10,
    margin: 5,
    backgroundColor: '#eee'
  }
})

export default listItem
