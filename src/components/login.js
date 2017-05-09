import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert,
    Linking,
    TouchableHighlight,
} from 'react-native';

import {getUUID, serializeJSON} from '../utils/helper'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            _xsrf: getUUID(),
        };
    }
    render() {
        return (
        <View style={{padding:20,marginTop:50}}>
            <View style={styles.item}><Text style={{width:70}}>邮箱号码</Text>
                <TextInput
                style={styles.input}
                onChangeText={this.onChangeEmail.bind(this)}
                placeholder='请输入邮箱号码'
                value={this.state.Email}
                />
            </View>
            <View style={styles.item}>
                <Text style={{width:70}}>密码</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={this.onChangePswd.bind(this)}
                    placeholder='请输入密码'
                    secureTextEntry={true}
                    value={this.state.password}
                />
            </View>
            <View style={styles.button_container}>
            <TouchableHighlight style={styles.button} underlayColor='#98acdf' onPress={this.login.bind(this)}>
                <Text style={{fontSize:16,color:'#fff'}}>登陆</Text>
            </TouchableHighlight>
            </View>
            <View style={[styles.button_container, {justifyContent: 'space-between'}]}>
            <TouchableHighlight style={styles.two_button} underlayColor='#98acdf' onPress={this.register.bind(this)}>
                <Text style={{fontSize:16,color:'#fff'}}>注册</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.two_button} underlayColor='#98acdf' onPress={this.reset.bind(this)}>
                <Text style={{fontSize:16,color:'#fff'}}>重置密码</Text>
            </TouchableHighlight>
            </View>
        </View>
        );
    }
    onChangeEmail(email) {
        this.setState({email})
    }
    onChangePswd(password) {
        this.setState({password})
    }
    reset() {
        Linking.openURL('http://www.guanggoo.com/forgot')
    }
    register() {
        Linking.openURL('http://www.guanggoo.com/register')
    }
    login() {
        if(!this.state.email||!this.state.password){
            Alert.alert(
                '提示',
                '用户名或密码不能为空！',
            )
            return
        }
        fetch('http://www.guanggoo.com/login', {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Content-Type': 'application/x-www-form-urlencoded',
                'cookie':  `_xsrf=${this.state._xsrf}`,
            },
            body: serializeJSON(this.state),
            method: 'post',
        })
        .then((response) => {
            if(response.status === 200) {
                this.props.cb();
                this.props.navigator.pop();
            }
            return response.text()
        })
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

const styles = StyleSheet.create({
    item:{
      flexDirection:'row',
      alignItems:'center',
      height:50,
      width:200,
    },
    button_container:{
      flexDirection:'row',
      alignItems:'center',
      height:50,
      width:'100%',
      marginBottom: 7,
    },
    input:{
      fontSize:14,
        width:150,
    },
    button:{
        flex: 1,
      backgroundColor:'#aaaaaa',
      height:50,
      marginTop:10,
      borderRadius: 7,
      justifyContent:'center',
      alignItems:'center'
    },
    two_button:{
      backgroundColor:'#aaaaaa',
      width: '49%',
      height:50,
      borderRadius: 7,
      marginTop:10,
      justifyContent:'center',
      alignItems:'center'
    },
});
