# LearnByDoing

## Let’s Get Going! 
This week we are going to learn the basics of debugging and navigation in React-Native (RN). We will be building a simple application and adding navigation to it and, in the process, exploring some tools and approaches to debugging.  

Like much of “computer science”, debugging is part art form, part great tools. Good debugging skills will save you lots and lots (and lots) of time and frustration. 

A famous quote about debugging is, “Everyone knows that debugging is twice as hard as writing a program in the first place. So if you're as clever as you can be when you write it, how will you ever debug it?” (Brian Kernighan) 

Any seasoned programmer knows the value of good debugging tools and their own “best” practices. I will try and cover a few simple approaches with you and some of the tools that can be used with RN. 

Let’s start by creating a new RN app:
```
$ react-native init LearnByDoing
$ cd LearnByDoing
$ atom ../LearnByDoing   <I use atom you can use your preferred editor>
```

Now let’s install a couple packages:
```
$ npm install --save react-navigation
$ npm install --save react-native-animated-sprite
```
Next let's startup Genymotion (or other) and get your Android emulator running. Once your emulator is running, start your new app:
```
$ react-native run-android
```

You should see:

<img src="https://raw.githubusercontent.com/micahrye/learn_by_doing/master/reactNativeDebugging/media/firstBuild.png" width="300" height="184">


Open "index.android.js" and make the following changes:
```
...
export default class LearnByDoing extends Component {
  constructor (props) {
    super(props);
    
    .log("hum, why didn't I see this?")
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

<img src="https://raw.githubusercontent.com/micahrye/learn_by_doing/master/reactNativeDebugging/media/error.png" width="300" height="184">

By calling console.error, RN will display a large red error modal with information about the error. If you "dismiss" the error, or press anywhere on the screen, you will then see this: 

<img src="https://raw.githubusercontent.com/micahrye/learn_by_doing/master/reactNativeDebugging/media/warn.png" width="300" height="184">

The yellow notification bar along the bottom indicates a warning. While the use of console warnings and errors are not meant for debugging per-se, they can be used for quick debugging info that gets your attention. Generally speaking you would use console.warn more so than error. 

You might be wondering why we did not see anything for "console.log()" in this output? Warnings and errors are meant for user notification, i.e. the person using your application. Logging, in contrast, is used specifically for you as the developer. As a result console.log statements do not have a UI display element like warn and error. 

With that said, console.log is a much handier way of doing "print statement" debugging. 

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

Great, let's start up the [Android Debug Bridge](https://developer.android.com/studio/command-line/adb.html) (ADB) with the logcat option to view emulator output (make sure are in your project’s root directory before running this next command):

```
$ adb logcat
```

When using 'adb logcat', you will also see log level information that the system (Android) prints out in addition to your own logging statements. 

While it may not seem like the best way to do debugging, this style of debugging can be extremely helpful and you should use it wisely. 

Here is an example of my console output: 

<img src="https://raw.githubusercontent.com/micahrye/learn_by_doing/master/reactNativeDebugging/media/log.png" width="600" height="242">

I know we are all used to a GUI world, but print statements will help immensely and it is really fast compared to breakpoints and GUIs, especially with RN. 

One more point I want to make before we proceed-- it is always easier to find mistakes if you do frequent debugging. Don't write hundreds of lines of code, add lots of new media and packages and then see if everything is working. When you do that you often can introduce many interrelated bugs that take time to debug. I find it much easier to debug after small changes, even if it is just for piece of mind. 

While we could solely use print statements for debugging, it is worthwhile to talk about some of the GUI debugging tools as well that we will get to a little later.

## React Navigation
Because I want to introduce [navigation](https://facebook.github.io/react-native/docs/navigation.html) too, I will focus on that for a little bit and then we will jump back to debugging tools. 

Let us also continue making a simple app that highlights some features of navigation in RN. 

We are going to add the following packages from react-native Image, Button, Dimensions. Your import should look like this: 
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

Next let’s create a new file in the root of your RN app called "Preferences.js" and add the following as the content: 
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

Now add the following to index.android.js: 
```
import _ from 'lodash';
import Preferences from './Preferences';
```

Since we added a lot of code, and multiple new import statements, we should reload our app and make sure nothing is the matter. 

Typically, I would have reloaded several times while writing the little bit we did above. Everything should work and you won’t see any changes. 

Next let’s create some visual interest in our application by adding a sprite, background image, and an icon image that is also a sprite structure. 

The following links are for the assets: [sprite folder](https://github.com/micahrye/learn_by_doing/tree/master/reactNativeDebugging/sprites/monster), [backgrounds](https://github.com/micahrye/learn_by_doing/tree/master/reactNativeDebugging/media), and [game icons](https://github.com/micahrye/LearnByDoing/tree/master/media). 

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

Moving on, let’s add a few more things to 'index.android.js' and add a couple global constants. Add the following: 
```
import AnimatedSprite from 'react-native-animated-sprite';
import monsterSprite from './sprites/monster/monsterSprite';
import gameIcon from "./media/gameIcon/gameIcon";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const baseHeight = 800;
const baseWidth = 1280;
```
Since we have added enough to our previously working codebase, now would be a good time to reload our code and… 

If you are like me, then you got an error :(

<img src="https://raw.githubusercontent.com/micahrye/learn_by_doing/master/reactNativeDebugging/media/import_error.png" width="600" height="453">

It looks like we forgot to add 'react-native-animated-sprite', and a quick look in package.json confirms that we did. 

Let’s fix that by running this on the command line: 
```
$ npm install --save react-native-animated-sprite
```
Now reload your app and voila! Everyone is happy :) 

Now let's add some navigation by adding the following to the bottom of 'index.android.js': 
```
const App = StackNavigator({
  Main: {screen: LearnByDoing},
  Prefs: {screen: Preferences},
});

AppRegistry.registerComponent('LearnByDoing', () => App);
```
In the render method, add the following before the return statement: 
```
const { navigate } = this.props.navigation;
```
In the return statement, after the last ‘Text element’, add: 
```
<Button
  onPress={() => navigate('Prefs')}
  title="Go to Prefs!!!"
/>
```
Now reload your app and you will see the following with working navigation!

<img src="https://raw.githubusercontent.com/micahrye/learn_by_doing/master/reactNativeDebugging/media/nav.png" width="600" height="365">

As important as navigation is, the React-Native project has not handled navigation as elegantly as one would hope. The early implementation had a lot of issues, especially for Android. In response, the open source community started building their own solutions. The RN project created "NavigationExperimental" as an option and the world was confused and none of the options were amazing. 

For now FB and RN have decided that the community solution "react-navigation" is the best and is the “supported” implementation (you may find different information on the Internet about how to implement navigation, but I strongly urge you to stick with using react-navigation). It should be noted that there has been a lot of open source community software incorporated into RN—that’s right, a community making things better!

Finally, let's get back to debugging. 

Replace the contents of index.android.js with the following [file](https://github.com/micahrye/LearnByDoing/blob/master/index.android.js).

Reload the app and it should all work. At this point, you should spend some time playing with the code that was given and get a feeling for how to use navigation.


## Chrome Developer Tools
The first GUI debugger we will use is Chrome. The Chrome developer tools are awesome for web development, but not as awesome for RN.

Before we dive into that more, let's learn by doing. 

In our index.android.js file, change 'iconList' to the following:
```
const iconList = [
      {
        name: 'BUBBLE',
        imgSrc: require('./media/gameIcon/game7_icon_color.png'),
        location: {top: 130, left: 100},
        frameIndex: [13],
      },
      {
        name: 'BUBBLE',
        imgSrc: require('./media/gameIcon/game7_icon_color.png'),
        location: {top: 230, left: 200},
        frameIndex: [13],
      },
    ];
```
Then add a 'debugger;' statement inside the 'forEach' statement in 'componentDidMount' so you have:
```
  componentDidMount () {
    _.forEach(this.iconList, (icon, index) => {
      const timeout = setTimeout(() => {
        debugger;
        let iconRef = this.refs[this.iconRefs[index]];
        iconRef.startTween();
      }, 100 * index);
      this.iconAppearTimeout.push(timeout);
    });
    
  }
```

WARNING!!!! You may see some warnings, I did. Even if you did not, these two warnings I saw are something you could see. The first is the following: 
```
Debugger and device times had drifted by more than 60s. Please correct this by running adb shell "date date +%m%d%H%M%Y.%S" on your debugger machine.
```
When you see this just do the following at the command line: 
```
$ adb shell "date `date +%m%d%H%M%Y.%S`"
```

The second is related to way Chrome is not "awesome" for RN:
```
Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).
```

This issue here is that Chrome does not handle RN debugging at native speeds and some other Chrome internal issues. As a result, especially with animations, the app may be very sloooow. 

For best performance I have found it is best to close all your other tabs and just debug. I will show you another approach in the following section, and don't forget you always have console.log and 'adb logcat' :)

If you opened the Chrome dev tool and reloaded the app you should see something like this: 

<img src="https://raw.githubusercontent.com/micahrye/learn_by_doing/master/reactNativeDebugging/debugger.png" width="960" height="530">

In the above image, the application has paused execution on line 72 at the 'debugger;' statement. In the upper right menu, there are several buttons for continuing program execution. Press the “step over” command icon twice to advance code execution by two lines.

In the console below the code, you can execute Javascript statements and inspect/change active program variables on the fly. This is one of the great things about JS, while debugging you can change variable values and even execute functions, etc. These are all parts of the tools you have to figure out what is going on or confirm what should happen with your code. 


## React Native Debugger 
The React Native Debugger (RND) is an open source debugging solution. It is a standalone app based on the official Remote Debugger for debugging React Native apps and includes React Inspector / Redux DevTools. The project has support for Linux, Mac OSX, and Windows. I have only used it on Mac OSX.

Go over to the projects Github repo [here](https://github.com/jhen0409/react-native-debugger) and follow the instructions for installing or get a pre-made binary [here](https://github.com/jhen0409/react-native-debugger/releases). 

While the interface looks different to Chrome’s dev tools, RND shares many similar functions. I believe it uses Chromium under the hood. Anyhow, the nice thing I have found is that it often functions much smoother than Chrome's dev tools with RN. Furthermore, I have had issues with general poor performance from Chrome when debugging RN apps. For that reason I generally use RND. 

Once you have installed RND, make sure to close your Chrome dev tools and open RND. Now reload your app, RND should become active, and you will find yourself paused at line 72 again :) 


## React Navigation
There is a lot to react-navigation, you will want to checkout the official [site](https://reactnavigation.org/) and read the [docs](https://reactnavigation.org/docs/intro/) if/when you use it. 


## Build an APK for Android
Read the React-Native docs for a great [tutorial on building an APK for Android](https://www.google.com/search?q=react-native+build+apk&oq=react-native+build+&aqs=chrome.0.69i59j69i57j69i60j0l3.3519j0j3&sourceid=chrome&ie=UTF-8)

## Exercise
You should spend more time practicing debugging—this will come in handy as you finish building your application prototype for usability testing. 

I suggest sometimes breaking the code on purpose and seeing what happens when you reload the app. What messages/errors does it display? Test different approaches, console.log, Chrome, RND. Get comfortable using multiple approaches. 

## Supplementary Reading (Optional)
I know I know I know, every week right? But really they are good books. Consider reading more from the “You Don’t Know JS” series [here](https://github.com/getify/You-Dont-Know-JS). 
