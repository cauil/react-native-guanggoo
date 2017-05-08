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
  View
} from 'react-native';

import Load from './src/components/load.js';
import Main from './src/main_ios';

export default class Home  extends Component {
    state = {
        loaded: false,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loaded: true
            })
        }, 1000)
    }
    render() {
        if(!this.state.loaded) {
            return (
                <Load />
            )
        } else {
            return (
                <Main />
            )
        }
    }
}


AppRegistry.registerComponent('guanggoo', () => Home);
