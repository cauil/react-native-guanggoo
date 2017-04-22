import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  ActivityIndicator,
} from 'react-native';

import {getHtml} from '../utils/api';

const CACHE = [];

export default class Lastest extends Component {
    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }),
        loaded: false,
        pageNum: 0,
    };
    componentDidMount() {
        this.getData(1);
    }
    getData(num) {
        console.log(`loading data ${num}`);
        const data = {type: this.props.type, name: this.props.name, pageNum: num};
        const html = getHtml(data).then( (result) => {
            console.log(result);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(CACHE),
                loaded: true,
                pageNum: num,
            })
        });
    }
    renderList() {
        return (
            <View><Text>test</Text></View>
        );
    }
    render() {
        if(!this.loaded && this.pageNum === 1) {
            return (
                <View style={{height: 50}}>
                    <ActivityIndicator  color="#356DD0" style={{marginVertical: 30,marginBottom: 30}} />
                </View>
            );
        } else {
            return this.renderList();
        }
    }
}
