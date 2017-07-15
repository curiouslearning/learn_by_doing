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
import AnimatedSprite from 'react-native-animated-sprite';
import monsterSprite from './sprites/monster/monsterSprite';
import gameIcon from "./media/gameIcon/gameIcon";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const baseHeight = 800;
const baseWidth = 1280;

export default class LearnByDoing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      iconArray: [],
    };
    const scaleWidth = screenWidth / baseWidth;
    const scaleHeight = screenHeight / baseHeight;
    this.scale = {
      screenWidth: scaleWidth,
      screenHeight: scaleHeight,
      image: scaleHeight > scaleWidth ? scaleWidth : scaleHeight,
    };

    const iconList = [
      {
        name: 'BUBBLE',
        imgSrc: require('./media/gameIcon/game7_icon_color.png'),
        location: {top: 130, left: 100},
        frameIndex: [13],
      },
    ];

    this.iconList = _.shuffle(iconList);
    this.iconAppearTimeout = [];
    this.gameIcon = {tweenOptions: {}};
    this.iconRefs = [];
    this.initIcons();
  }
  
  componentDidMount () {
    _.forEach(this.iconList, (icon, index) => {
      const timeout = setTimeout(() => {
        let iconRef = this.refs[this.iconRefs[index]];
        iconRef.startTween();
      }, 100 * index);
      this.iconAppearTimeout.push(timeout);
    });
    
  }

  componentWillUnmount () {
    _.forEach(this.iconAppearTimeout, timeout => clearTimeout(timeout));
  }
  
  startSize () {
    return ({
      width: 240 * this.scale.image,
      height: 240 * this.scale.image,
    });
  }

  scaleLocation (location) {
    return ({
      top: location.top * this.scale.screenHeight,
      left: location.left * this.scale.screenWidth,
    });

  }

  makeZoomTween (startScale=0.01, endScale= 1, duration=1000) {
    //React bug (I think): Scale of 0 is set to 1 on load
    if (startScale == 0) {
      startScale = 0.01;
    }
    else if (endScale == 0) {
      endScale == 0.01;
    }
    return ({
      tweenType: "zoom-into-existence",
      startScale: startScale,
      startOpacity: 0,
      endScale: endScale,
      duration: duration,
      loop: false,
    });
  }
  
  static navigationOptions = {
    title: 'WELCOME HERE',
    header: false
  };
  
  press () {
    const { navigate } = this.props.navigation;
    console.log("PRESS PRESS");
    navigate('Prefs');
  }
  
  initIcons () {
    this.icons = _.map(this.iconList, (icon, index) => {
      const ref = ("gameRef" + index);
      this.iconRefs.push(ref);
      console.log("REFS = ", ref);
      return (<AnimatedSprite
        key={index}
        ref={ref}
        sprite={gameIcon}
        animationFrameIndex={icon.frameIndex}
        loopAnimation={false}
        coordinates={{top:icon.location.top, left: icon.location.left}}
        size={this.startSize()}
        draggable={true}
        scale={0.1}
        opacity={0}
        tweenOptions = {this.makeZoomTween(0.1, 1, 1000)}
        tweenStart={'fromMethod'}
        onPress={() => this.press()}
      />);
    });
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{ flex: 1, }}
      >
        <Button
          onPress={() => navigate('Prefs')}
          title="Go to Prefs"
        />
        <Image
          source={require('./media/backgrounds/back01.jpg')}
          style={{
            opacity: 1,
            width: 1280,
            height: 800,
          }}
        />
      {this.icons}
        
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

const App = StackNavigator({
  Main: {screen: LearnByDoing},
  Prefs: {screen: Preferences},
});

AppRegistry.registerComponent('LearnByDoing', () => App);
