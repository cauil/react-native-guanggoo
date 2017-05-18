/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import codePush from "react-native-code-push";
import Load from './src/components/load.js';
import Main from './src/main_ios';

export default class Home  extends Component {
    state = {
        loaded: false,
    }

    /*
    codePushStatusDidChange(status) {
        switch(status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for updates.");
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package.");
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update.");
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                console.log("Up-to-date.");
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                console.log("Update installed.");
                break;
        }
    }
    codePushDownloadDidProgress(progress) {
        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
    }
    */

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loaded: true
            })
        }, 1000)
    }
    render() {
        if(!this.state.loaded) {
            return (
                <Load />
            )
        } else {
            return (
                <Main />
            )
        }
    }
}

Home = codePush({ 
    updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: '更新: ',
        mandatoryContinueButtonLabel: '确定',
        mandatoryUpdateMessage: '',
        optionalIgnoreButtonLabel: '取消',
        optionalInstallButtonLabel: '确定',
        optionalUpdateMessage: '',
        title: '可用更新',
    },
    installMode: codePush.InstallMode.ON_NEXT_RESUME 
})(Home);

AppRegistry.registerComponent('guanggoo', () => Home);
