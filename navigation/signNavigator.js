import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SignInScreen from '../screens/signin';
const AuthStack = createStackNavigator({
  SignIn: SignInScreen
});
