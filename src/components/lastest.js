import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  ActivityIndicator,
} from 'react-native';

import TopicListCell from './topicListCell.js';
import {getHtml} from '../utils/api';
//import {parseData} from '../utils/data';

const List = [];
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
        getHtml(data).then( (result) => {
            console.log(result);
            //List.push(parseData(result));
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(List),
                loaded: true,
                pageNum: num,
            })
        });
    }
    renderList() {
        return (
            <ListView
            style={Style.listView}
            ref="listview"
            pageSize={36}
            dataSource={this.state.dataSource}
            renderFooter={this.renderFooter}
            renderRow={this.renderTopicListCell}
            onEndReached={this.onEndReached}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={true} />
        );
    }
    renderFooter() {
    }
    renderTopicListCell(data) {
        return (
            <TopicListCell
                onSelect={
                    () => this.selectTopic(data)
                }
                data={data} />
        );
    }
    selectTopic(data) {
        this.props.navigator.push({
            title: '详细' + (data.replies_count ? '（' + data.replies_count.toString() + '条回复）' : ''),
            component: TopicView,
            passProps: {
                data: data
            }
        });
    }
    onEndReached() {
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

const Style = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listView: {
        marginTop: 65,
        marginBottom: 0
    },
});
