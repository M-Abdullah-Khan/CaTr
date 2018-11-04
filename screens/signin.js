import React from 'react';
import {
  StyleSheet,
  Text,
  AsyncStorage,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
//import { WebBrowser } from 'expo';
import Header from '../components/Header_all.js';

export default class signin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : '',
      fname: '',
    }
  }

  componentDidMount(){
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var fname = await AsyncStorage.getItem('fname');
    var email = await AsyncStorage.getItem('email');
    if(email !== null){
      if(fname !== null){
        Platform.OS === 'ios'
          ?  this.props.navigation.NavigatorIOS('App')
          :  this.props.navigation.navigate('App')
      }
      else{
        Platform.OS === 'ios'
          ?  this.props.navigation.NavigatorIOS('Setup')
          :  this.props.navigation.navigate('Setup')
      }
    }
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container_sup}>
        <Header />
        </View>
        <KeyboardAvoidingView behavior = 'padding' style={styles.container2}>
          <View style={styles.container_login}>
            <View style={styles.username}>
              
              <TextInput
                autoCapitalize="none"
                placeholder="Phone or Email"
                autoCorrect={false}
                autoFocus={false}
                onSubmitEditing={() => { this.TextInput2.focus(); }}
                blurOnSubmit={false}
                onChangeText={(text) => {this.setState({email: text})}}
                underlineColorAndroid='transparent'
                style={styles.input}
                returnKeyType='next'
                clearTextOnFocus={true}
              />
            </View>
            <View style={styles.password}>
              <TextInput
                autoCapitalize="none"
                placeholder="Password"
                autoCorrect={false}
                autoFocus={false}
                style={styles.input}
                secureTextEntry = {true}
                ref={(input) => { this.TextInput2 = input }}
                onChangeText={(text) => this.setState({password: text})}
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={styles.submit}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.loginbtn}
                onPress={this._signInAsync} >
                <Text style={styles.center}>Login</Text>
              </TouchableOpacity>
              <View style={styles.container_login} onClick={this._forgot}>
                <Text style={styles.forgetPassText}>FORGOT PASSWORD?</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.containerunder}>
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

  _signInAsync = () => {
    var myEmail = this.state.email;
    var myPass = this.state.password;
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    if(re.test(myEmail)){ 
      console.log('Email is ok');
    }
    else{
      alert('Email is invalid');
      return;
    }

    fetch('http://192.168.137.1:3000/users',{
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
        AsyncStorage.setItem('fname', res.fname);
        AsyncStorage.setItem('myid', res.myid);
        if(res.fname !== '') { //Check New Member
          if(res.phone === null){
            Platform.OS === 'ios'   //If New Member Send to Setup
              ?  this.props.navigation.NavigatorIOS('Setup3')
              :  this.props.navigation.navigate('Setup3')
          }
          else{
            Platform.OS === 'ios'   //If old member Send to App
              ?  this.props.navigation.NavigatorIOS('App')
              :  this.props.navigation.navigate('App')
          }
        }
        else{   //if basic profile is set or not?
          if(res.phone !== null){
            Platform.OS === 'ios'   //If New Member Send to Setup
                ?  this.props.navigation.NavigatorIOS('Setup')
                :  this.props.navigation.navigate('Setup')
            }
          else{
            Platform.OS === 'ios'   //If New Member Send to Setup
                ?  this.props.navigation.NavigatorIOS('Setup3')
                :  this.props.navigation.navigate('Setup3')
          }
        } 
      }
      else {  
        alert(res.message);
      }
    })
    .done();
  };
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };
  _signUpAsync = async () => {
    this.props.navigation.navigate('Signup');
  };
  _forgot = async () => {
    this.props.navigation.navigate('Forgot');
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
  containerunder:{
    flex:2,
  },
  container2: {
    flex: 5,
  },
  input: {
    backgroundColor: '#fff',
    width: DEVICE_WIDTH - 70,
    height: 70,
    marginHorizontal: 20,
    paddingLeft: 10,
    color: '#000',
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
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  loginbtn:{
    borderRadius: 10,
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
    borderRadius: 10,
    backgroundColor: '#00cc66',
  }, 
  center: {
    color: '#fff',
    fontSize:20,
  },
});
