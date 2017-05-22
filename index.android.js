/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import _ from 'lodash';
import Preferences from './Preferences';

export default class LearnByDoing extends Component {
  constructor (props) {
    super(props);
    console.log("I see I am in the constructor");
  }
  
  componentWillMount () {
    console.log("the component will mount");
  }
  
  componentDidMount () {
    console.log("the component did mount");
  }
  
  componentWillUnmount () {
    console.log("say goodbye while you can");
  }
  
  render() {
    console.log("this thing is going to render now")
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('LearnByDoing', () => LearnByDoing);
