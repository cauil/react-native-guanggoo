import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import TopicListCell from './topicListCell';
import TopicView from './topic';
import NeedLoginView from './needLoginView.js';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {getHtml} from '../utils/api';
import {parseListData} from '../utils/data';
import {needLoginNodes} from '../utils/const';

let List = [];
export default class Lastest extends Component {
    constructor(props) {
        super(props);
        let needLogin = false;
        if(props.type === 'node' && (needLoginNodes.indexOf(props.name) > -1) ) {
            needLogin = true;
        }
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            loaded: false,
            pageNum: 0,
            List: [],
            needLogin,
            refreshing: false,
        };
    }
    componentWillMount() {
        Icon.getImageSource('share', 20).then((source) => this.setState({ shareIcon: source }));
        Icon.getImageSource('arrow-left', 20).then((source) => this.setState({ backIcon: source }));
    }
    render() {
        if(this.state.needLogin) {
            return (
                <NeedLoginView />
            )
        }
        if(this.state.loaded && this.state.pageNum > 0) {
            return this.renderList();
        } else if(!this.state.refreshing) {
            return (
                <ActivityIndicator animating={true}  color="#356DD0" style={[Style.centering], {height: 80, marginTop: 100}} size="large" />
            );
        } else {
            return (
                <View></View>
            )
        }
    }
    componentDidMount() {
        this.getData(1);
    }
    getData(num) {
        const data = {type: this.props.type, name: this.props.name, pageNum: num};
        getHtml(data).then( (result) => {
            const arr = parseListData(result);
            this.state.List = this.state.List.concat(arr);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.state.List),
                loaded: true,
                pageNum: num,
                refreshing: false,
            })
        });
    }
    onRefresh() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.List),
            List: [],
            pageNum: 0,
            refreshing: true,
        });
        this.getData(1);
    }
    renderList() {
        if(this.state.needLogin) {
            return (
                <View style={Style.login_container}>
                    <Text>请先登录社区再完成操作!</Text>
                </View>
            )
        }
        return (
            <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
                tintColor="#98acdf"
                colors={["#98acdf", "#356DD0"]}
                enabled={true}
                size="large"
              />
            }
            style={Style.listView}
            ref="listview"
            initialListSize={8}
            dataSource={this.state.dataSource}
            renderFooter={this.renderFooter.bind(this)}
            renderRow={this.renderTopicListCell.bind(this)}
            onEndReached={this.onEndReached.bind(this)}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false} />
        );
    }
    renderFooter() {
        if(this.state.loaded){
            return <View style={{height: 50}} ><Text></Text></View>;
        }

        return <ActivityIndicator animating={true}  color="#356DD0" style={{height: 80, marginBottom: 200}} size="large" />
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
            title: '详细' + (data.count ? '（' + data.count.toString() + '条回复）' : ''),
            leftButtonIcon: this.state.backIcon,
            onLeftButtonPress: this.props.navigator.pop,
            rightButtonIcon: this.state.shareIcon,
            rightButtonTitle: '分享',
            component: TopicView,
            passProps: {
                data: data,
                type: 'topic',
            },
            showTabBar: false,
        });
    }
    onEndReached() {
        if(!this.state.loaded) {
          return;
        }
        return this.getData(this.state.pageNum + 1);
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
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});
