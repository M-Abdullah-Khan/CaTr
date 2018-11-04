import React from 'react';
import {
  StyleSheet,
  Text,
  AsyncStorage,
  TextInput,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
//import { WebBrowser } from 'expo';

import Header from '../components/Header_all.js';

export default class forgot extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.container2}>
          <View style={styles.container_login}>
            <View style={styles.username}>
              <TextInput
                autoCapitalize="none"
                placeholder="Phone or Email"
                autoCorrect={false}
                autoFocus={false}
                style={styles.input}
              />
            </View>
            <View style={styles.submit}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.loginbtn}
                onPress={this._signInAsync} >
                <Text style={styles.center}>Recover</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.container_sup}>
          <View style={styles.container_login}> 
            <View style={styles.dividerContainer}>
              <View style={styles.margins}><Text>           --------------------------------</Text></View>
              <View style={styles.internalText}><Text>OR</Text></View>
              <View style={styles.margins}><Text>--------------------------------           </Text></View>
            </View> 
            <View style={styles.submit}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.singupbtn}
                onPress={this._signUpAsync} >
                <Text style={styles.center}>CREATE NEW ACCOUNT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
  _signUpAsync = async () => {
    await AsyncStorage.setItem('PassToken', 'aaa');
    this.props.navigation.navigate('Signup');
  };


}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  container_sup:{
    flex: 2,
  },
  container1: {
    flex: 3,
    alignItems: 'center',
    justifyContent:'center',
  },
  container2: {
    flex: 5,
  },
  logoText:{
    fontFamily: "bariol",
    fontSize:60,
    textAlign:"center",
  },
  logo_img:{
    height:60 +'%',
    width:60 +'%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255  , 1)',
    width: DEVICE_WIDTH - 70,
    height: 70,
    marginHorizontal: 20,
    paddingLeft: 10,
    color: '#fff',
  },
  username:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  password:{
    flex:1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container_login:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
   margins:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  dividerContainer:{
    flexDirection:'row',
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  submit:{
    flex:1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loginbtn:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    width: DEVICE_WIDTH - 80,
    height:10,
    backgroundColor: '#0984e3',
  },
  singupbtn:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    width: DEVICE_WIDTH - 80,
    height:10,
    backgroundColor: 'rgba(0, 153, 0, 1)',
  }, 
  center: {
    color: '#fff',
    fontSize:20,
  },
});
