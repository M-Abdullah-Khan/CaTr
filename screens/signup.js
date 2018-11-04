import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Platform,
  AsyncStorage,
  Alert,
} from 'react-native';
//import { WebBrowser } from 'expo';
import {FormLabel, FormInput, FormValidationMessage, Input}from 'react-native-elements';
import Header from '../components/Header_all.js';
export default class signup extends React.Component {
  state = {
    email: '',
    password:'',
  };


  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <KeyboardAvoidingView style = {styles.container_input} behavior = 'padding'>
          <View style = {styles.pad_small}>
            <View style = {styles.input}>
              <FormLabel><Text style = {styles.label}>Email</Text></FormLabel>
              <FormInput
                onSubmitEditing={() => { this.TextInput1.focus(); }}
                blurOnSubmit={false}
                underlineColorAndroid='transparent'
                returnKeyType='next'
                onChangeText={(text) => this.setState({email: text})}/>
            </View>
          </View>
          <View style = {styles.pad_small}>
            <View style = {styles.input}>
              <FormLabel><Text style = {styles.label}>Password</Text></FormLabel>
              <FormInput
                underlineColorAndroid='transparent'
                returnKeyType='next'
                onChangeText={(text) => this.setState({password: text})}
                ref={(input) => { this.TextInput1 = input }}
              />
            </View>
          </View>
          <View style={styles.container_sup}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.singupbtn}
              onPress={this._CheckInputsAndPerform} >
              <Text style={styles.center}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        
        <View style={styles.dividerContainer}>
          <View style={styles.margins}><Text>           --------------------------------</Text></View>
          <View style={styles.internalText}><Text>OR</Text></View>
          <View style={styles.margins}><Text>--------------------------------           </Text></View>
        </View>
        <View style={styles.container_login} onClick={this._forgot}>
          <Text style={styles.forgetPassText}>Recover</Text>
        </View>
      </View>
    );
  }

  _CheckInputsAndPerform = async () => {

    fetch('http://192.168.137.1:3000/create',{
      method: 'POST',
      headers:{
        'Accept' :'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })

    .then((response) => response.json())
    .then((res) => {

      if (res.success === true) {
        AsyncStorage.setItem('email', res.email);
        Platform.OS === 'ios'   //If old member Send to App
              ?  this.props.navigation.NavigatorIOS('Setup')
              :  this.props.navigation.navigate('Setup')
      }
      else {  
        alert(res.message);
      }
    })
    .done();
  };
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_sup:{
    flex: 3,
    alignItems: 'center',
    justifyContent:'center',
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
  singupbtn:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    width: DEVICE_WIDTH - 80,
    maxHeight: 60,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 153, 0, 1)',
  },
  container_input:{
    flex: 4,
    height: 70,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',  
  },
  input:{
    width: DEVICE_WIDTH - 70,
    height: 70,
    marginHorizontal: 20,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00cc66'
  },
  center: {
    color: '#fff',
    fontSize:20,
  },
  label:{
    color: '#00cc66',
  },
  pad_small:{
    paddingVertical: 5,
  },
});
