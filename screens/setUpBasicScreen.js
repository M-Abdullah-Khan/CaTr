import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  View,
  Switch,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  DatePickerAndroid,
} from 'react-native';
//import { WebBrowser } from 'expo';
import {FormLabel, FormInput, Button, FormValidationMessage, Input, Icon, ButtonGroup}from 'react-native-elements';
import Header from '../components/header.js';
import { Bariol } from '../components/StyledText';

export default class setUpBasicScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email : '',
      FullName: '',
      MF: 0,
      fname: '',
      isLoading: true,
      DOB_M: '',
      DOB_Y: '',
      DOB_D: '',
      Phone: '',
      Phone2: '',
    }
  }

  updateIndex = (index) => {
    this.setState({MF: index})
  }

  componentDidMount(){
    this._loadInitialState().done();
  }
  _loadInitialState = async () => {
    var email = await AsyncStorage.getItem('email');
    this.setState({email: email});
    var fname = await AsyncStorage.getItem('fname');
    this.setState({fname: fname});
    this.setState({isLoading: false});
  }

  render_my_profile() {
    return(
      <View style = {styles.container}>
        <View style = {styles.container_inner}>
          <View style = {styles.container_top}>
            <Text style = {styles.text_bigBasic}>Basic Information</Text>
            <Text style = {styles.text_bigMessage}>Please enter basic information</Text>
          </View>
          <KeyboardAvoidingView style = {styles.container_input} behavior = 'padding'>
            <View style = {styles.pad_med}>
              <View style = {styles.input}>
                <Text style = {styles.small_bariol_green}>Full Name</Text>
                <TextInput
                  autoFocus={true} 
                  underlineColorAndroid='transparent'
                  textContentType='name'
                  autoCapitalize='words'
                  clearTextOnFocus={true}
                  onChangeText={(text) => this.setState({FullName: text})}
                  onSubmitEditing={this._onMyDatePress}
                />
              </View>
            </View>
            <View style = {styles.container_inline}>
              <View style = {styles.container_center_justify}>
                <ButtonGroup
                  selectedBackgroundColor="#00cc66"
                  onPress={this.updateIndex}
                  selectedIndex={this.state.MF}
                  buttons={['Male', 'Female']}
                  selectedButtonStyle = {styles.bg_basic}
                  containerStyle={{height: 30}}
                />
              </View>
              <View style = {styles.container_center_justify}>
                <Icon 
                  name = "calendar" 
                  type = "evilicon" 
                  size = {25} 
                  color = '#00cc66'
                  raised
                  reverse
                  underlayColor = "#00bb11"
                  onPress={this._onMyDatePress}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <Text style = {styles.small_bariol_green}>Phone</Text>
                <TextInput
                  onSubmitEditing={() => { this.TextInput2.focus(); }}
                  blurOnSubmit={false}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  keyboardType='numeric'
                  textContentType='telephoneNumber'
                  onChangeText={(text) => this.setState({Phone: text})}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <Text style = {styles.small_bariol_green}>Secondary Phone</Text>
                <TextInput
                  ref={(input) => { this.TextInput2 = input }}
                  underlineColorAndroid='transparent'
                  returnKeyType='done'
                  keyboardType='numeric'
                  textContentType='telephoneNumber'
                  onChangeText={(text) => this.setState({Phone2: text})}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.container_center_justify}>
            <Icon 
              raised
              underlayColor = "#00bb11"
              containerStyle = {styles.icon_button}
              onPress={this._setBasicProfile} 
              name = "chevron-right" 
              type = "evilicon" 
              size = {100} 
              color = '#fff'>
            </Icon>
        </View>
      </View>
    );
  }
  static navigationOptions = {
    header: null
  };

  //Main render function
  render() {
    
    return (
      <ScrollView style={styles.container} contentContainerStylee = {styles.container_center_justify}>
        {this.state.isLoading ? <ActivityIndicator size = "large" color = "#00cc66" /> : this.render_my_profile()}
      </ScrollView>
    );
  }
  _onMyDatePress = async () => {
   try {
      const {action, year, month, day} = await DatePickerAndroid.open({           
        date: new Date(), mode:'spinner', prompt:'Date of Birth'
      });
      if(action == DatePickerAndroid.dateSetAction){
        this.setState({DOB_D: day});
        this.setState({DOB_M: month});
        this.setState({DOB_Y: year});
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }   
  };

  _setBasicProfile = () => {
    fetch('http://192.168.137.1:3000/put_basic_profile',{
      method: 'POST',
      headers:{
        'Accept' :'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        fullname: this.state.FullName,
        gender: this.state.MF,
        dobD: this.state.DOB_D,
        dobM:this.state.DOB_M,
        dobY:this.state.DOB_Y,
        Phone: this.state.Phone,
        Phone2: this.state.Phone2,
        email: this.state.email,
      })
    })

    .then((response) => response.json())
    .then((res) => {

      if (res.success === true) {
        AsyncStorage.setItem('email', res.email);
        AsyncStorage.setItem('fname', res.fname);
        AsyncStorage.setItem('myid', res.myid);
        if(res.fname !== '') { //Check New Member
          Platform.OS === 'ios'   //If old member Send to App
              ?  this.props.navigation.NavigatorIOS('Setup3')
              :  this.props.navigation.navigate('Setup3')
        }
        else{
          Platform.OS === 'ios'   //If New Member Send to Setup
              ?  this.props.navigation.NavigatorIOS('Setup3')
              :  this.props.navigation.navigate('Setup3')
        } 
      }
      else {  
        alert(res.message);
      }
    })
    .done();
  };
  _logOutAsync = async () => {
    alert('Logging Out');
    AsyncStorage.setItem('fname', '');
    AsyncStorage.setItem('email', '');
    AsyncStorage.setItem('myid', '');
    Platform.OS === 'ios'
      ?  this.props.navigation.NavigatorIOS('Auth')
      :  this.props.navigation.navigate('Auth')
  };
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
  },
  container_center_justify:{
    flex:1,
    justifyContent: 'center',
    alignItems:  'center',

  },
  container_inner:{
    alignItems: 'center',
    justifyContent: 'center',  
  },
  container_inline:{
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  container_top:{
    flex:2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45,  
  },
  container_input:{
    paddingVertical: 30,
    maxWidth: DEVICE_WIDTH - 40,
    alignItems: 'center',
    justifyContent: 'center',  
  },
  basic:{
    color: '#00cc66',
  },
  icon_button:{
    maxWidth: 100,
    maxHeight: 100,
    backgroundColor: '#00cc66'
  },
  text_bigBasic:{
    color: '#00cc66',
    fontSize: 32,
    fontFamily: "bariol",
  },
  text_bigMessage:{
    color: '#00bb11',
    fontSize: 22,
    fontFamily: "bariol",
    fontWeight: '400',
    textAlign: 'center', 
  },
  text_hopeMessage:{
    color: '#00cc66',
    fontSize: 18,
    fontFamily: "bariol",
    textAlign: 'center',
  },
  small_bariol_green:{
    color: '#00cc66',
    fontFamily: "bariol",
    paddingLeft: 2,
  },
  input:{
    justifyContent: 'center',  
    width: DEVICE_WIDTH - 70,
    height: 60,
    marginHorizontal: 30,
    paddingLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00cc66'
  },
  bg_basic:{
    backgroundColor: '#00cc66',
  },
  pad_small:{
    paddingVertical: 5,
  },
  pad_med:{
    paddingVertical: 10,
  },
  pad_large:{
    paddingVertical: 15,
  }
});
