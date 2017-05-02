import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class needLoginView extends Component {
    render() {
        return (
            <View style={Style.login_container}>
                <Text style={Style.text}>本主题需要登录社区后才能展示!</Text>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    login_container: {
        backgroundColor: '#eeeeee',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#356DD0',
    },
});
