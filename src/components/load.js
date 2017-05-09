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
              <Image style={Style.logo} source={{uri: 'http://cdn.guanggoo.com/static/images/guanggoonew.png'}} />
              <Text style={Style.ad}>
                    Powered by React-Native
              </Text>
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
    ad: {
        color: '#00abe4',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'contain',
    },
});
