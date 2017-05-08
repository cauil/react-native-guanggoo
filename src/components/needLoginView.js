import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';

export default class NeedLoginView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={Style.login_container}>
                <Text style={Style.text}>本主题需要登录社区后才能展示!</Text>
                <Button
                  onPress={this.props.onSelect}
                  title="点我登陆"
                  color="#98acdf"
                  accessibilityLabel="Learn more about this purple button"
                />
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
        marginBottom: 10,
    },
});
