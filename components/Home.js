import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'

const openMovie = (navigation) => {
    navigation.navigate('Movie')
}

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title = "Movies" onPress={()=> openMovie(navigation)} />
    </View>
  )
}

const styles = StyleSheet.create()

export default Home