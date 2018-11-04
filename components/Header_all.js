import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
//import { WebBrowser } from 'expo';

import { Bariol } from '../components/StyledText';

export default class header_all extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container1}>
        <Text style={styles.logoText}>CaTr</Text>
        <Text>The best in the world</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container1: {
    flex: 3,
    alignItems: 'center',
    justifyContent:'center',
  },
  logoText:{
    fontFamily: "bariol",
    fontSize:60,
    textAlign:"center",
  },
});
