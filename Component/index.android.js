/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

class Components extends Component {
  renderScene(route, navigator) {
    return <route.component navigator={navigator} {...route.passProps} />
  }

  render() {
    return (
      <Navigator
      style={ styles.container }
      renderScene={ this.renderScene }
      initialRoute={{ component: One }}
      />
    );
  }
}

class One extends Component {
  _navigate = (event) => {
    this.props.navigator.push({
      component: Two
    })
  }

  render() {
    return (
      <View>
        <Text style={ styles.text }>Hello From One</Text>
        <TouchableHighlight onPress={ this._navigate } style={ styles.button }>
          <Text>Go To Two</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class Two extends Component {

  _navigate = (event) => {
    this.props.navigator.push({
      component: Three
    })
  }

  render() {
    return (
      <View>
        <Text style={ styles.text }>Hello From Two</Text>
        <TouchableHighlight onPress={ this._navigate } style={ styles.button }>
          <Text>Go To Three</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class Three extends Component {

  _navigate = (event) => {
    this.props.navigator.push({
      component: Four
    })
  }

  _goForward = (event) => {
      this.props.navigator.jumpForward() // THROWS ERROR IF NO FUTURE ROUTE IN STACK
  }

  _resetRouteStack = (event) => {
    this.props.navigator.immediatelyResetRouteStack([{ component: One }, { component: Four }]) /* Reset every scene with an array of routes */
  }

  render() {
    return (
      <View>
        <Text style={ styles.text }>Hello From Three</Text>
        <TouchableHighlight onPress={ this._navigate } style={ styles.button }>
          <Text>Go To Four</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={ this._goForward } style={ styles.button }>
           <Text>Go Forward</Text>
        </TouchableHighlight>

         <TouchableHighlight onPress={ this._resetRouteStack } style={ styles.button }>
           <Text>RESET ROUTE STACK</Text>
         </TouchableHighlight>
      </View>
    );
  }
}

class Four extends Component {

  _navigate = (event) => {
    // this.props.navigator.resetTo({ component: One })
    // this.props.navigator.jumpBack()
    // console.log(this.props.navigator.getCurrentRoutes)
    // this.props.navigator.replace({ component: Two })
    //this.props.navigator.replaceAtIndex({ component: One}, 2)
    // this.props.navigator.replacePrevious({ component: One })
    this.props.navigator.popToTop()
  }

  _goBack = (event) => {
    this.props.navigator.jumpBack() // JUMPS BACK WITHOUT REMOVING ROUTE FROM STACK
  }

  _pop = (event) => {
    this.props.navigator.pop() // REMOVES ROUTE FROM STACK
  }

  render() {
    return (
      <View>
        <Text style={ styles.text }>Hello From Four</Text>
        <TouchableHighlight onPress={ this._navigate } style={ styles.button }>
          <Text>CUSTOM METHOD</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={ this._goBack } style={ styles.button }>
          <Text>Jump Back</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={ this._pop } style={ styles.button }>
          <Text>Pop Back</Text>
        </TouchableHighlight>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60
  },
  text: {
    fontSize:20
  },
  button: {
    backgroundColor: '#efefef',
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10
  }
});

AppRegistry.registerComponent('Component', () => Components);
