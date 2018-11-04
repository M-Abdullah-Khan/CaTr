import React from 'react';
import {
  Image,
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

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //SystemVars
      isLoading: true,
      //BasicInfo
      email : '', fname: '', gender: 0,
      //AdvInfo
      phone: '', phone2: '', dob: '',curcity: '',
      //EduInfo
      ed1: '',ed2: '',ed3: '',ed4: '',ed5: '',
      ed1from: '',ed2from: '',ed3from: '',ed4from: '',ed5from: '',
      //ResumeInfo
      cursal: '',expsal: '',curjob: '',curjobat: '',
      skill1: '',skill2: '',skill3: '',skill4: '',skill5: '',
      skill1l: '',skill2l: '',skill3l: '',skill4l: '',skill5l: '',
      favcity1: '',favcity2: '',favcity3: '',
      favcomp1: '',favcomp2: '',favcomp3: '',
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
    //alert(this.state.fname);
    if(fname !== null){
      await this._fetchDataProfile().done();
    }
    else{ //This should never happen but still for completion purpose and to shut the players
      Platform.OS === 'ios'
      ?  this.props.navigation.NavigatorIOS('Setup')
      :  this.props.navigation.navigate('Setup')
    }
  }
  //Learn to convert First letter to capital through javascript
  //Appply that  to fname display
  _fetchDataProfile = async () => {
    await fetch('http://192.168.137.1:3000/get_profile',{
      method: 'POST',
      headers:{
        'Accept' :'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        email: this.state.email
      })
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.success === true) {         

          //Set States with response
          AsyncStorage.setItem('fname', res.fname);
          this.setState({gender: res.gender});
          this.setState({phone: res.phone});
          this.setState({phone2: res.phone2});
          this.setState({dob: res.dob});
          //Set EduInfo
          this.setState({ed1: res.ed1});
          this.setState({ed2: res.ed2});
          this.setState({ed3: res.ed3});
          this.setState({ed4: res.ed4});
          this.setState({ed5: res.ed5});
          this.setState({ed1from: res.ed1from});
          this.setState({ed2from: res.ed2from});
          this.setState({ed3from: res.ed3from});
          this.setState({ed4from: res.ed4from});
          this.setState({ed5from: res.ed5from});
          //Set ResumeInfo
          this.setState({cursal: res.cursal});
          this.setState({expsal: res.expsal});
          this.setState({curjob: res.curjob});
          this.setState({curjobat: res.curjobat});
          
          this.setState({skill1: res.skill1});
          this.setState({skill2: res.skill2});
          this.setState({skill3: res.skill3});
          this.setState({skill4: res.skill4});
          this.setState({skill5: res.skill5});

          this.setState({skill1l: res.skill1l});
          this.setState({skill2l: res.skill2l});
          this.setState({skill3l: res.skill3l});
          this.setState({skill4l: res.skill4l});
          this.setState({skill5l: res.skill5l});
          
          this.setState({curcity: res.curcity});
          this.setState({favcity1: res.favcity1});
          this.setState({favcity2: res.favcity2});
          this.setState({favcity3: res.favcity3v});
          this.setState({favcomp1: res.favcomp1});
          this.setState({favcomp2: res.favcomp2});
          this.setState({favcomp3: res.favcomp3});
          // set loading done
          this.setState({isLoading: false});
          
      } else {  //cannot connect  
        alert(res.message);
      }
    })
    .done();
  }
  render_my_profile() {
    return(
      <View style={styles.cont_basic_1}>
        <View style={styles.cont_cent_2}>
          <Text style={styles.text_name}>
            Welcome {this.state.gender ? "Miss. ": "Mr. "}{this.state.fname /*Say Name*/} 
          </Text>
        </View>
        <View style={styles.container_profile}>
          <View style={styles.cont_row_3}>
            <View style={styles.cont_center_1}>
              <Text style={styles.text_basicBlack}>{this.state.curcity /* Say city from bio */}</Text>
            </View>
            <View style={styles.cont_center_1}>
              <Image style={styles.profile_image}
                source = {require('../assets/images/profile01.png') /*This image is hardcoded for now*/} 
              />
            </View>
            <View style={styles.cont_center_1}>
              <Text style={styles.text_bigBlack}>218</Text>
              <Text style={styles.text_basicBlack}>RECOS</Text>
            </View>
          </View>
          <View style={styles.cont_center_1}>
            <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button_outlined}
            onPress={this._logOutAsync}
            >
              <Text style={styles.text_medBasic}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cont_center_1}>
            <Text>Make complete and beautiful profile here</Text>
          </View>
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
  _logOutAsync = async () => {
    alert('Logging Out');
    AsyncStorage.setItem('fname', '');
    AsyncStorage.setItem('email', '');
    AsyncStorage.setItem('myid', '');
    AsyncStorage.setItem('gender', '');
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
  },
  cont_cent_2:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  containerInline:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',   
  },
  cont_basic_1: {
    flex: 1,
    backgroundColor: '#00cc66',
  },
  text_name: {
    paddingTop: 22,
    color: '#fff',
    fontSize: 18,
    fontFamily: "bariol",
  },
  container_profile:{
    flex: 8,
    backgroundColor: '#fff',
  },
  cont_row_3:{
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  container_profile_image:{
    flex: 3,
  },
  profile_image:{
    flex:1,
    borderRadius: 1255,
    maxWidth: 125,
    maxHeight: 125,
    minHeight: 125,
    minWidth: 125,  
  },
  cont_center_1:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  button_outlined:{
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent:'center',
    borderColor: '#00cc66',
    backgroundColor: '#fff',
    width: DEVICE_WIDTH-125,
    height:50,
  },
  text_basicBlack:{
    fontSize: 14,
    color: '#111',
    opacity: 0.7,
    padding: 5,
    fontFamily: "bariol", 
  },
  text_bigBlack:{
    color: '#000',
    fontSize: 25,
    fontFamily: "bariol", 
  },
  text_medBasic:{
    color: '#00cc66',
    fontSize: 18,
    fontFamily: "bariol", 
  },
});
