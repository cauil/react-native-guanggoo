import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    Linking,
    TouchableHighlight, 
} from 'react-native';

const CookieManager = require('react-native-cookies');

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        CookieManager.get(home_url, (err, cookie) => { // 判断cookie
          let isAuthenticated;
          console.log(cookie);
          if (cookie && cookie.hasOwnProperty('user')) {
            isAuthenticated = true;
          }
          else {
            isAuthenticated = false;
          }

          this.setState({
            loggedIn: isAuthenticated,
            loadedCookie: true
          });
        });
    }
    render() {
        return (
          <View style={Style.container}>
              <Image style={Style.logo} source={{uri: 'http://cdn.guanggoo.com/static/images/guanggoonew.png'}} />
              <Text style={Style.ad}>
                    The mobile guanggoo app created by reactnative。
              </Text>
              <Button
                  onPress={this._onSelect}
                  title="退出登陆"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
            <TouchableHighlight onPress={() => this._onPress('http://github.com/cauil/react-native-guanggoo')}>
              <Text style={Style.link}>
                http://github.com/cauil/react-native-guanggoo
              </Text>
            </TouchableHighlight>
          </View>
        );
    }
    _onSelect() {
        CookieManager.clearAll((err, res) => {
          console.log('cookies cleared!');
          console.log(err);
          console.log(res);
        });
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
