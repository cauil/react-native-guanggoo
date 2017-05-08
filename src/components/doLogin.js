import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    WebView,
    AsyncStorage,
} from 'react-native';


const login_url = 'http://www.guanggoo.com/login'
const home_url = 'http://www.guanggoo.com/'
const debug = true
const inject_script = `
    var obj
    let logined = false;
    const ele = document.querySelector('.ui-header .username')
    const topic_num = document.querySelector('.ui-content .status-topic a').innerHTML
    const topic_url = document.querySelector('.ui-content .status-topic a').getAttribute('href')
    const reply_num = document.querySelector('.ui-content .status-reply a').innerHTML
    const reply_url = document.querySelector('.ui-content .status-reply a').getAttribute('href')
    const favor_num = document.querySelector('.ui-content .status-favorites a').innerHTML
    const favor_url = document.querySelector('.ui-content .status-favorites a').getAttribute('href')
    const repu_num = document.querySelector('.ui-content .status-reputation a').innerHTML
    const repu_url = document.querySelector('.ui-content .status-reputation a').getAttribute('href')
    if(ele) {
        logined = true
        username = ele.innerHTML
        obj = {
            logined,
            username,
            topic_num,
            topic_url,
            reply_num,
            reply_url,
            favor_num,
            favor_url,
            repu_num,
            repu_url,
        }
    } else {
        obj = {logined}
    }
    // test
    document.write('get msg')
    const msg = JSON.stringify(obj)
    window.postMessage(msg)
`

export default class DoLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: props.url || login_url,
        }
    }
    render() {
        console.log(this.state);
        return (
            <WebView
              ref={'webview'}
              automaticallyAdjustContentInsets={false}
              style={styles.webView}
              source={{uri: this.state.url}}
              javaScriptEnabled={true}
              onNavigationStateChange={this.onNavigationStateChange.bind(this)}
              startInLoadingState={true}
              scalesPageToFit={true}
              onMessage={this.onMessage}
            />
        );
    }
    onNavigationStateChange(state) {
        if(debug) {
            console.log(`debugger: webview navigationState change`)
            console.log(state);
        }
        //if(state.url === home_url && state.loading) {
        //if(state.loading) {
            this.webview && this.webview.injectJavaScript(inject_script)
        //}
    }
    async onMessage(e) {
        console.log('onmessage')
        if(debug) {
            console.log(`debugger: get data from webview:`)
            console.log(e)
        }
        const data = JSON.parse(e.nativeEvent.data)
        if(data.logined) {
            if(debug) {
                console.log('debugger: login true')
            }
            const value = await AsyncStorage.mergeItem(home_url, JSON.stringify(data));
            if(value) {
                this.props.navigator.pop();
            }

        } else {
            if(debug) {
                console.log('debugger: login false')
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
