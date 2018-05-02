import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Numbers from './containers/Numbers';

export default class App extends React.Component {
  onGenerateNumbersPress() {    
  }
  render() {    
    return (
      <View style={styles.container}>
        <Numbers onNumbersPress={this.onGenerateNumbersPress}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
