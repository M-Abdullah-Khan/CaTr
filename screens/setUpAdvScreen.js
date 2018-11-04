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
    /*Work Variables*/
      isLoading: true,
      //Keep Track of the info added
      educationAdded:0,
      facCityAdded:0,
      favCompAdded:0,
      skillAdded:0,
    /*Profile Information*/
      email : '', fname: '',
    /*Education Information*/
      education1: '',education2: '',education3: '',education4: '',education5: '',
      edu1Visible:false, edu2Visible:false, edu3Visible:false, edu4Visible:false,
      education1from: '',education2from: '',education3from: '',education4from: '',education5from: '',
    /*Job Information*/
      curJob: '',curSal: '',expSal: '',
    /*Fav City*/
      favCity1: '', favCity2: '', favCity3: '',
    /*Fav Comp*/
      favComp1: '', favComp2: '', favComp3: '',
    /*Skill and level*/
      skill1: '', skill2: '', skill3: '', skill4: '', skill5: '',
      skill1L: '', skill2L: '', skill3L: '', skill4L: '', skill5L: '',
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
            <Text style = {styles.text_bigBasic}>Your Basic Profile is set.</Text>
            <Text style = {styles.text_bigMessage}>Now let's get your resume done!</Text>
          </View>
          <KeyboardAvoidingView style = {styles.container_input} behavior = 'padding'>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <Text style = {styles.small_bariol_green}>Education</Text>
                <TextInput
                  autoFocus={true}
                  blurOnSubmit={false}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={(text) => this.setState({education1: text})}
                  onSubmitEditing={() => { this.TextInput1.focus(); }}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <FormLabel><Text style = {styles.label}>Education From</Text></FormLabel>
                <FormInput
                  onSubmitEditing={() => { this.TextInput2.focus(); }}
                  blurOnSubmit={false}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={(text) => this.setState({education1from: text})}
                  ref={(input) => { this.TextInput1 = input }}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <FormLabel><Text style = {styles.label}>Current Job</Text></FormLabel>
                <FormInput
                  onSubmitEditing={() => { this.TextInput3.focus(); }}
                  blurOnSubmit={false}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={(text) => this.setState({CurJob: text})}
                  ref={(input) => { this.TextInput2 = input }}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <FormLabel><Text style = {styles.label}>Current Salary</Text></FormLabel>
                <FormInput
                  onSubmitEditing={() => { this.TextInput4.focus(); }}
                  blurOnSubmit={false}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={(text) => this.setState({curSal: text})}
                  ref={(input) => { this.TextInput3 = input }}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <FormLabel><Text style = {styles.label}>Expected Salary</Text></FormLabel>
                <FormInput
                  onSubmitEditing={() => { this.TextInput5.focus(); }}
                  blurOnSubmit={false}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={(text) => this.setState({expSal: text})}
                  ref={(input) => { this.TextInput4 = input }}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <FormLabel><Text style = {styles.label}>Favourite City 1</Text></FormLabel>
                <FormInput
                  onSubmitEditing={() => { this.TextInput6.focus(); }}
                  blurOnSubmit={false}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={(text) => this.setState({favCity1: text})}
                  ref={(input) => { this.TextInput5 = input }}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <FormLabel><Text style = {styles.label}>Favourite Company 1</Text></FormLabel>
                <FormInput
                  onSubmitEditing={() => { this.TextInput7.focus(); }}
                  blurOnSubmit={false}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={(text) => this.setState({favComp1: text})}
                  ref={(input) => { this.TextInput6 = input }}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <FormLabel><Text style = {styles.label}>Skill 1</Text></FormLabel>
                <FormInput
                  onSubmitEditing={() => { this.TextInput8.focus(); }}
                  blurOnSubmit={false}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={(text) => this.setState({skill1: text})}
                  ref={(input) => { this.TextInput7 = input }}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <FormLabel><Text style = {styles.label}>Skill 1 Level</Text></FormLabel>
                <FormInput
                  onSubmitEditing={() => { this.TextInput9.focus(); }}
                  blurOnSubmit={false}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={(text) => this.setState({skill1L: text})}
                  ref={(input) => { this.TextInput8 = input }}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <FormLabel><Text style = {styles.label}>Skill 2</Text></FormLabel>
                <FormInput
                  onSubmitEditing={() => { this.TextInput10.focus(); }}
                  blurOnSubmit={false}
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={(text) => this.setState({skill2: text})}
                  ref={(input) => { this.TextInput9 = input }}
                />
              </View>
            </View>
            <View style = {styles.pad_small}>
              <View style = {styles.input}>
                <FormLabel><Text style = {styles.label}>Skill 2 Level</Text></FormLabel>
                <FormInput
                  underlineColorAndroid='transparent'
                  returnKeyType='next'
                  onChangeText={(text) => this.setState({skill2L: text})}
                  ref={(input) => { this.TextInput10 = input }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.button_container}>
            <Icon 
              raised
              underlayColor = "#00bb11"
              containerStyle = {styles.icon_button}
              onPress={this._logOutAsync} 
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
      <ScrollView style={styles.container}>
        {this.state.isLoading ? <ActivityIndicator size = "large" color = "#00cc66" /> : this.render_my_profile()}
      </ScrollView>
    );
  }
  _onMyDatePress = async () => {
   try {
      const {action, year, month, day} = await DatePickerAndroid.open({           
        date: new Date()
      });
      if(action == DatePickerAndroid.dateSetAction){
        this.setState({DOB_D: day});
        this.setState({DOB_M: month});
        this.setState({DOB_Y: year});
        alert(day + ' ' + month + ' ' + year);
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }   
  };

  _setAdvProfile = () => {

    var mydob = this.state.DOB_Y + "-" + this.state.DOB_M + "-" + this.state.DOB_D;
    fetch('http://192.168.137.1:3000/put_basic_profile',{
      method: 'POST',
      headers:{
        'Accept' :'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        fullname: this.state.FullName,
        gender: this.state.MF,
        dob: this.state.mydob,
        CurJob: this.state.CurJob,
        CurJobAt: this.state.CurJobAt,
        CurSal: this.state.CurSal,
        Education: this.state.Education,
        EducationFrom: this.state.EducationFrom,
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
              ?  this.props.navigation.NavigatorIOS('App')
              :  this.props.navigation.navigate('App')
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
    backgroundColor: '#fff'
  },
  container_1:{
    flex:1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1_row:{
    flex:1, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_inner:{
    alignItems: 'center',
    justifyContent: 'center',  
  },
  container_inline:{
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
  button_container:{
    flex: 1,
    alignItems: 'center',
    justifyContent:'center', 
  },
  label:{
    color: '#00cc66',
  },
  icon_button:{
    maxWidth: 100,
    maxHeight: 100,
    backgroundColor: '#00cc66'
  },
  text_bigBasic:{
    color: '#000',
    fontSize: 28,
    fontFamily: "bariol",
  },
  text_bigMessage:{
    color: '#00bb11',
    fontSize: 18,
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
  btn_selected:{
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
  },
  small_bariol_green:{
    color: '#00cc66',
    fontFamily: "bariol",
    paddingLeft: 2,
  },
});
