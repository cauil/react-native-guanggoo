import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Linking,
    TouchableHighlight, 
} from 'react-native';

export default class Load extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
          <View style={Style.container}>
              <Image style={Style.logo} source={require('../assets/guanggoonew.png')} />
          </View>
        );
    }
}

const Style = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'contain',
    },
});
