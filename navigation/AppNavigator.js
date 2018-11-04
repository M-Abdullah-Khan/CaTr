import React from 'react';
import MainTabNavigator from './MainTabNavigator';
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import SignInScreen from '../screens/signin';
import SignUpScreen from '../screens/signup';
import forgotScreen from '../screens/Forgot';
import setUpScreen from '../screens/setUpNewAcc';
import setUpBasicScreen from '../screens/setUpBasicScreen';
import setUpAdvScreen from '../screens/setUpAdvScreen';
const AuthStack = createStackNavigator({
  SignIn: SignInScreen
});
const SignStack = createStackNavigator({
  SignUp: SignUpScreen
});
const forgotStack = createStackNavigator({
  Forgot: forgotScreen
});
const setUpStack = createStackNavigator({
  Setup: setUpScreen,
  Setup2: setUpBasicScreen,
  Setup3: setUpAdvScreen
});
/*This is just for keeping in view how you can approve the back button for some consecutive screens
**Here Pressing the back button on otherscreen will take you to the previous screen
**This  type of thing is usually used in main screen but it can be used in our app in most cases 
** Mainly when dealing with authentacion and making new accout and stuff.
** For Profile and other screen we will simply use the tab bar system as used in MainTabnavigator
** Right Now I have Kept it for home screen. Which need adding
** But now our app has started to take a little shape and some buttons are also working
** Next Step is to make the sign in working through taking and setting up DB online
** Then trying hard stuff
** For the moment I will focus on design
*/

// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthStack,
    App: MainTabNavigator,
    Auth: AuthStack,
    Signup: SignStack,
    Forgot: forgotStack,
    Setup: setUpStack,
    Setup2: setUpBasicScreen,
    Setup3: setUpAdvScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
