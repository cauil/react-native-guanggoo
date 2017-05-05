import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Linking,
    TouchableHighlight, 
} from 'react-native';

export default class User extends Component {
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
                    The mobile guanggoo app created by reactnative。
              </Text>
            <TouchableHighlight onPress={() => this._onPress('http://github.com/cauil/react-native-guanggoo')}>
              <Text style={Style.link}>
                http://github.com/cauil/react-native-guanggoo
              </Text>
            </TouchableHighlight>
          </View>
        );
    }
    _onPress(url){
        Linking.openURL(url);
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
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    link: {
        marginTop: 20,
        color: '#356DD0',
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'contain',
    },
});
