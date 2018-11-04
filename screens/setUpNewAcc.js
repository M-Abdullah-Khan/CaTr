import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
//import { WebBrowser } from 'expo';
import {Icon} from 'react-native-elements';
import Header from '../components/header.js';

import { Bariol } from '../components/StyledText';

export default class setUpNewAcc extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : '',
      fname: '',
      isLoading: true,
      newMember: false,
    }
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
        <View style = {styles.container}>
          <Text style = {styles.text_bigBasic}>WELCOME</Text>
          <Text style = {styles.text_bigMessage}>It's time to set up your profile!</Text>
          <Text style = {styles.text_hopeMessage}>Get Ready to tap into your talents and give something back.</Text>
          <Text style = {styles.text_hopeMessage}>So get your documents and let's go.</Text>
        </View>
        <View style={styles.button_container}>
            <Icon 
              raised
              underlayColor = "#00bb11"
              containerStyle = {styles.icon_button}
              onPress={this._sendToCreateProfile} 
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
      <View style={styles.container}>
        {this.state.isLoading ? <ActivityIndicator size = "large" color = "#00cc66" /> : this.render_my_profile()}
      </View>
    );
  }
  _sendToCreateProfile = async () => {
    Platform.OS === 'ios'
      ?  this.props.navigation.NavigatorIOS('Setup2')
      :  this.props.navigation.navigate('Setup2')
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
    justifyContent: 'center',
    alignItems: 'center', 
  },
  button_container:{
    flex: 1,
    alignItems: 'center',
    justifyContent:'center', 
  },
  icon_button:{
    maxWidth: 100,
    maxHeight: 100,
    backgroundColor: '#00cc66'
  },
  text_bigBasic:{
    color: '#00cc66',
    fontSize: 36,
    fontFamily: "bariol",
  },
  text_bigMessage:{
    color: '#00bb11',
    fontSize: 28,
    fontFamily: "bariol",
    fontWeight: '400',
    textAlign: 'center', 
  },
  text_hopeMessage:{
    color: '#00cc66',
    fontSize: 18,
    fontFamily: "bariol",
    textAlign: 'center',
  }
});
