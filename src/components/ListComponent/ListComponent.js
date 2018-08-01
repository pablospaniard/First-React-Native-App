import React from 'react'
import {StyleSheet, FlatList} from 'react-native'

import {ListItem} from '../'

const listComponent = props => {
  const {places} = props
  return (
    <FlatList
      style={styles.listContainer}
      data={places}
      renderItem={info => (
        <ListItem
          placeName={info.item.name}
          placeImage={info.item.image}
          onItemDeleted={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
})

export default listComponent
