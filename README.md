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
