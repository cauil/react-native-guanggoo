import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    Linking,
    AsyncStorage,
    TouchableHighlight, 
} from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Login from './login';

const CookieManager = require('react-native-cookies');
const home_url = 'http://www.guanggoo.com/'

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '未登陆',
            logined: false,
            url: 'http://cdn.guanggoo.com/static/avatar/28/m_default.png',
        };
    }
    async getInfo() {
        const value = await AsyncStorage.getItem('username')
        const url = await AsyncStorage.getItem('url')
        if(value) {
          this.setState({
            loggedIn: true,
            username: value,
          });
        }
    }
    componentWillMount() {
        Icon.getImageSource('arrow-left', 20).then((source) => this.setState({ backIcon: source }));
        this.getInfo();
        /*
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
        */
    }
    render() {
        return (
          <View style={Style.container}>
                <Image style={Style.logo} source={{uri: 'http://cdn.guanggoo.com/static/images/guanggoonew.png'}} />
                <View style={Style.info_container}>
                    <Image style={Style.avatar}
                    source={{
                        uri: this.state.url
                    }} />

                    <View style={Style.topic}>
                        <Text style={Style.title}>
                            {this.state.username}
                        </Text>
                        {this.renderInfo()}
                    </View>

                </View>
                <View style={Style.button_container}>
                    {this.state.logined ? (
                        <TouchableHighlight style={Style.button} underlayColor='#737ab7' onPress={this._onSelect}>
                            <Text style={{fontSize:16,color:'#fff'}}>退出登陆</Text>
                        </TouchableHighlight>
                    ) : null}
                    {!this.state.logined ? (
                        <TouchableHighlight style={Style.button} underlayColor='#737ab7' onPress={this._login.bind(this)}>
                            <Text style={{fontSize:16,color:'#fff'}}>登陆</Text>
                        </TouchableHighlight>
                    ) : null}
            </View>
          </View>
        );
    }
    renderInfo() {
    }
    _onSelect() {
        CookieManager.clearAll((err, res) => {
          console.log('cookies cleared!');
          console.log(err);
          console.log(res);
        });
    }
    _login() {
        this.props.navigator.push({
            title: '',
            leftButtonIcon: this.state.backIcon,
            leftButtonTitle: '',
            onLeftButtonPress: this.props.navigator.pop,
            component: Login,
            passProps: {
                cb: this.loginCb.bind(this),
            },
            showTabBar: false,
        });
    }
    loginCb() {
        this.getInfo();
    }
}

const Style = StyleSheet.create({
    container: {
        marginTop: 50,
        backgroundColor: '#ffffff',
        flex:1,
        //justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'contain',
    },
    button_container:{
        flex: 1,
        paddingLeft: 70,
        paddingRight: 70,
        flexDirection:'row',
        alignItems:'center',
        height:50,
        width:'100%',
        marginBottom: 7,
    },
    button:{
        flex: 1,
        backgroundColor:'#98acdf',
        height:50,
        marginTop:10,
        borderRadius: 7,
        borderColor: '#98acdf',
        justifyContent:'center',
        alignItems:'center'
    },
    info_container: {
        flex: 1,
        height: 50,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        borderColor: '#E2E2E2'
    },
    avatar: {
        alignSelf: 'flex-start',
        width: 50,
        height: 50,
        marginRight: 10,
        justifyContent: 'center',
        borderRadius: 3,
    },
    topic: {
        height: 50,
        flex: 1,
        marginBottom: 5
    },
});
