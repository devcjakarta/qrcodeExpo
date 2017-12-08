/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class ScanResult extends PureComponent {
  constructor (props) {
    super(props)
    this.code = this.props.navigation.state.params.code
  }
  componentDidMount () {
    console.log(this.code)
  }
  handlePressCorrectIdentity = () => {
    console.log('Sending data to server...')
  }
  handlePressWrongIdentity = () => {
    this.props.navigation.goBack()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {`Please check your identity! ${this.code}`}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handlePressCorrectIdentity}
        >
          <Text> Yes, it's me! </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handlePressWrongIdentity}
        >
          <Text> Sorry, it isn't me! </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  },
});
