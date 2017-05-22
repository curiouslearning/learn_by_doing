# LearnByDoing

## Let’s Get Going! 
I thought it would be good to put our past work to work a bit during this week as we learn about the basics of debugging and navigation in React-Native (RN). We will work through this week’s learning by building a simple application and adding navigation to it. In the process we explore some tools and approaches to debugging.  

Like much of “computer science” debugging is part art form, part great tools. Good debugging skills will save you lots and lots and lots and lots (and lots) of time and frustration. 

A famous quote about debugging is, “Everyone knows that debugging is twice as hard as writing a program in the first place. So if you're as clever as you can be when you write it, how will you ever debug it?” (Brian Kernighan) 

Any seasoned programmer knows the value of good debugging tools and their own “best” practices. I will try and cover a few simple approaches with you and some of the tools that can be used with RN. 

Let’s start be creating a new RN app. 
```
$ react-native init LearnByDoing
$ cd LearnByDoing
$ atom ../LearnByDoing   <I use atom you can use your prefered editor>
```

Alright now let’s install a couple packages
```
$ npm install --save react-navigation
$ npm install --save react-native-animated-sprite
```
Good, now let's startup Genymotion (or other) and get your Android emulator running. Once your emulator is running start you new app. 
```
$ react-native run-android
```

You should see

<img src="https://raw.githubusercontent.com/micahrye/LearnByDoing/master/media/firstBuild.png" width="300" height="184">


Great, now open "index.android.js" and make the following changes.  
```
...
export default class LearnByDoing extends Component {
  constructor (props) {
    super(props);
    console.log("hum, why didn't I see this?")
  }
  
  componentWillMount () {
    console.warn("the component will mount");
  }
  
  componentDidMount () {
    console.error("the component did mount");
  }
  
  componentWillUnmount () {
    console.warn("say goodbye while you can");
  }
...
````

Now rebuild your app and you should see the following: 

<img src="https://raw.githubusercontent.com/micahrye/LearnByDoing/master/media/error.png" width="300" height="184">

By calling console.error RN will display a large red error modal with information about the error that. If you "dismiss" the error, or press anywhere on the screen, you will then see this: 

<img src="https://raw.githubusercontent.com/micahrye/LearnByDoing/master/media/warn.png" width="300" height="184">

The yellow notification bar along the botton indicatings a warning. While the use of console warn and error are not meant for debugging, per se, they can be used for quick debugging info that gets your attention. Generally speaking you would use console.warn moreso then error. 

You might be wondering why we did not see anything for "console.log()" Well warn and error are meant for user notification, i.e. the end user, while loging is somthing that is done for you not the end user. As a result console log does not have a UI display element like warn and error. 

With that said, console.log is a much hander way of doing "print statement" debugging. 

Let's change our class to look like this: 
```
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
```

Great, now let's start up the [Android Debug Bridge](https://developer.android.com/studio/command-line/adb.html) (ADB) with the logcat option to view emulator output. (you should be in your projects root directory)

```
$ adb logcat
```

When using 'adb logcat' you will also see other log level information that the system (android) prints out, in addition to your own info. While it may not seem like the best way to do debugging, this style of debugging can be extreamly helpful and you should use it wisely. 

Here is an example of my console output: 

<img src="https://raw.githubusercontent.com/micahrye/LearnByDoing/master/media/log.png" width="600" height="242">

I know we are all use to a gui world, but really print statements will help you and they are really fast comparied to breakpoints and guis, especially with RN. With that said their are some other great tools. 

One more point I want to make before we proceed. It is always easier to find mistakes if you do frequent debugging. Don't write hundreds of lines of code, add lots of new media and packages and then see if everthing is working. When you do that you often can introduce many interelatd bugs that take time to debug. I find it much easier to debug after small changes, even if it is just for piece of mind. 

Alright let's talk about some of the GUI tools. 

## Chrome Developer Tools
As we continue talking about debugging let us also continue making a simple app that highlights some features of navigation in RN. We are going to add the following packages from react-native Image, Button, Dimensions. Your import should look like this: 
```
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
} from 'react-native';
```

Great, now let's great a new file in the root of your RN app called "Preferences.js" add the following as the contents of Preferences.js: 
```
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
  Button,
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

export default class Preferences extends Component {
  
  static navigationOptions = {
    title: 'Preferences',
    header: false
  };
  
  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <View>
        <Text
          style={{
            fontSize: 42,
          }}
        >
          User Preferences
        </Text>
        <Button
          onPress={() => navigate('Main')}
          title="Curious about Learning?"
        />
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
  fontStyle: {
    fontSize: 42,
  },
});


AppRegistry.registerComponent('Preferences', () => App);
```

Awesome, not add the following to index.android.js: 
```
import _ from 'lodash';
import Preferences from './Preferences';
```

Okay, we just added a lot of code and multiple new import statements, we really sould reload our app and make sure nothing is the matter. Typically I would have reloaded several times while writing the little bit we did above. Everything should work and you wont see any changes. Let's add some media to our project. 

We are going to add a sprite, background image, and an icon image that is also a sprite strucutre. The following links are for the assets: [sprits folder](https://github.com/micahrye/LearnByDoing/tree/master/sprites/), [backgrounds](https://github.com/micahrye/LearnByDoing/tree/master/media), and [game icons](https://github.com/micahrye/LearnByDoing/tree/master/media). 

Make sure you have a similar tree structure to this: 
```
LearnByDoing/
|--- Preferences.js
|--- index.android.js
|--- media/
      |---- backgrounds
      |---- gameIcon
|--- sprites
      |--- monster
```

Alright, we are going import a few more things to 'index.android.js' and add a couple global constants. Add the following: 
```
import AnimatedSprite from 'react-native-animated-sprite';
import monsterSprite from './sprites/monster/monsterSprite';
import gameIcon from "./media/gameIcon/gameIcon";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const baseHeight = 800;
const baseWidth = 1280;
```
Okay, let's reload our app!!! If you are like me you got an error :( 

<img src="https://raw.githubusercontent.com/micahrye/LearnByDoing/master/media/import_error.png" width="600" height="453">

It looks like we forgot to add 'react-native-animated-sprite,' a quick look in package.json confirms that we did. At the command line do the following: 
```
$ npm install --save react-native-animated-sprite
```
Now reload your app, okay everyone is happy :) 



## React Native Debugger 

## React Navigation



