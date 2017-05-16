import React, {Component} from 'react';
import {
  NetInfo,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableHighlight,
} from 'react-native';

import {myToast} from '../utils/helper'

export default class NeedLoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            network: 'wifi',
        }
    }
    componentWillMount() {
        NetInfo.fetch().done((network) => {
            this.setState({network})
            return network;
        });
        NetInfo.addEventListener( 'change', (network) => {
            this.setState({network})
        });
    }
    render() {
        return (
            <View style={Style.login_container}>
                <Text style={Style.text}>本主题需要登录社区后才能展示!</Text>
                <View style={Style.button_container}>
                    <TouchableHighlight style={Style.button} underlayColor='#737ab7' onPress={() => {
                        if(this.state.network === 'none') {
                            myToast('无网络链接!')
                            return
                        }
                        this.props.onSelect()
                    }}>
                    <Text style={{fontSize:16,color:'#fff'}}>点我登录</Text>
                </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    login_container: {
        padding: 50,
        backgroundColor: '#eeeeee',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#98acdf',
        marginBottom: 10,
    },
    button_container:{
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
      justifyContent:'center',
      alignItems:'center'
    },
});
