# React Native Cards List

![gif](https://thumbs.gfycat.com/PeriodicAdmirableHarrierhawk-size_restricted.gif)

A React Native component that displays a list of image cards with titles. When the user
presses a card, the card expands to full screen, displaying additional content.

# Example

```javascript
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { CardList } from 'react-native-card-list';

const cards = [
  {
    id: "0",
    title: "Starry Night",
    picture: require('./assets/starry.jpg'),
    content: <Text>Starry Night</Text>
  },
  {
    id: "1",
    title: "Wheat Field",
    picture: require('./assets/wheat.jpg'),
    content: <Text>Wheat Field with Cypresses</Text>
  },
  {
    id: "2",
    title: "Bedroom in Arles",
    picture: require('./assets/bed.jpg'),
    content: <Text>Bedroom in Arles</Text>
  }
]

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <CardList cards={cards} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
```