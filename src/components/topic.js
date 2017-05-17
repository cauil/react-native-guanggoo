import React, {Component} from 'react';
import {
    NetInfo,
    StyleSheet,
    View,
    Text,
    Alert,
    ListView,
    Image,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

import NeedLoginView from './needLoginView.js';
import CommentCell from './commentCell';
import Login from './login';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import {getHtml} from '../utils/api';
import {parseTopicData} from '../utils/data';
import {needLoginNodes} from '../utils/const';
import {myToast} from '../utils/helper'

const CookieManager = require('react-native-cookies');
const home_url = 'http://www.guanggoo.com';

export default class Topic extends Component {
    constructor(props) {
        super(props);
        const reg = /^\/t\/(\d+)/i;
        const topicNum = props.data.url.match(reg)[1]
        let needLogin = false;
        if(needLoginNodes.indexOf(props.data.nodeType) > -1) {
            needLogin = true;
        }
        this.state = {
            loaded: false,
            pageNum: 0,
            topicNum,
            dataHeader: props.data,
            content: [],
            comment: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            needLogin,
            refreshing: false,
            loggedIn: false,
            loadedCookie: false,
            network: 'wifi',
        };
    }
    componentWillMount() {
        Icon.getImageSource('arrow-left', 20).then((source) => this.setState({ backIcon: source }));

        CookieManager.get(home_url, (err, cookie) => { // 判断cookie
          let isAuthenticated;
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

        NetInfo.fetch().done((network) => {
            if(network === 'none') {
                myToast('无网络链接!')
            }
            this.setState({network})
            return network;
        });
        NetInfo.addEventListener( 'change', (network) => {
            this.setState({network})
            if(network !== 'none' && !this.state.loaded) {
                this.getData();
            }
        });
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        if(this.state.loadedCookie) {
            if(this.state.needLogin && !this.state.loggedIn) {
                return (
                    <NeedLoginView onSelect={this.doLogin.bind(this)} />
                )
            }
            if(this.state.loaded) {
                return (
                <View style={{flex:1, marginTop: 65}}>
                    {this.renderTopicHeader()}
                    {this.renderLoaded()}
                </View>
                )
            } else if (this.state.refreshing || this.state.network === 'none') { // 还在refreshing 或者无网络情况下
                return (
                    <View></View>
                )
            } else {
                return (
                    <ActivityIndicator animating={true}  color="#356DD0" style={[Style.centering], {height: 80, marginTop: 100}} size="large" />
                );
            } 
        } else {
            return (
                <View></View>
            )
        }
    }
    doLogin() {
        this.props.navigator.push({
            title: '登陆',
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
        this.getData();
        this.setState({
            loggedIn: true,
        })
    }
    getData() {
        const data = {type: this.props.type, name: this.state.topicNum};
        getHtml(data).then( (result) => {
            const {comment, content} = parseTopicData(result);
            this.setState({
                loaded: true,
                refreshing: false,
                dataSource: this.state.dataSource.cloneWithRows(comment),
                content,
                comment,
            })
        });
    }
    onRefresh() {
        if(this.state.network === 'none') {
            myToast('无网络链接!')
            return
        }
        const comment = [];
        const content = [];
        this.setState({
            content,
            comment,
            dataSource: this.state.dataSource.cloneWithRows(comment),
            refreshing: true,
        });
        this.getData();
    }
    renderLoaded() {
        return (
            <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
                tintColor="#98acdf"
                colors={["#98acdf", "#356DD0"]}
                enabled={true}
              />
            }
            renderHeader={this.renderTopicContent.bind(this)}
            dataSource={this.state.dataSource}
            renderRow={this.renderCommentList.bind(this)}
            renderFooter={this.renderFooter.bind(this)}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            style={Style.TopicList}
            enableEmptySections={true} />
        );
    }
    renderTopicContent() {
        return (
            <View style={Style.container}>
                {this.state.content.map((v, i) => {
                    return this.renderTopicContentCell(v, i);
                })}
            </View>
        );
    }
    renderTopicContentCell(v, i) {
        return (
            <View key={i} style={[Style.contentWrapper, {marginTop: -5}]}>
                {v.text ? <Text style={Style.content}>{v.text}</Text> : null}
                {v.img.map((im, j) => {
                    return this.renderImg(im, j)
                })}
            </View>
        )
    }
    renderImg(img, i) {
        let is_absolute_url = false;
        if(img && img.indexOf('http') === -1) {
            is_absolute_url = true;
            img = 'http://www.guanggoo.com' + img;
        }
        if(is_absolute_url) {
            return (
                <Image key={i} style={Style.content_emoji} source={{uri: img}} />
            )
        } else {
            return (
                <Image key={i} style={Style.content_img} source={{uri: img}} />
            )
        }
    }
    renderCommentList(data) {
        return (
            <CommentCell data={data} />
        );
    }
    renderTopicHeader() {
        const data = this.state.dataHeader;

        return (
            <View style={Style.header}>
                <View style={{flex:1}}>
                    <Text style={Style.title}>
                        {data.title}
                    </Text>
                    {this.renderHeadInfo()}
                </View>
                <Image style={Style.avatar}
                        source={{
                            uri: data.avatar
                    }}/>
            </View>
        );
    }
    renderHeadInfo() {
        const data = this.state.dataHeader;
        if(data.count){
            return (
                <Text style={Style.info}>
                    <Text style={Style.node_name}>{data.node}</Text> • 
                    <Text style={Style.user}>{data.username}</Text> • 
                    <Text style={Style.time}>于{data.last_touched}发布</Text> •
                    <Text>最后回复来自</Text>
                    <Text style={Style.user}>{data.last_reply_username}</Text> 
                </Text>
                );
        }
        return (
            <Text style={Style.info}>
                <Text style={Style.node_name}>{data.node}</Text> • 
                <Text style={Style.user}>{data.username}</Text> • 
                <Text style={Style.time}>于{data.last_touched}发布</Text>
            </Text>
        );
    }
    renderFooter() {
        if(this.state.loaded){
            return <View style={{height: 0}} ><Text></Text></View>;
        }

        return <ActivityIndicator animating={true}  color="#356DD0" style={{height: 80, marginBottom: 200}} size="large" />
    }
}

const Style = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#ffffff',
	},
	header: {
		flexDirection: 'row',
		backgroundColor: '#f5f5f5',
		borderColor: '#e9e9e9',
		borderBottomWidth: 1,
		padding: 5,
	},
	title: {
        color: '#444',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'left'
	},
	info: {
		fontSize: 12,
		color: '#666666',
		textAlign: 'left',
		marginTop: 5,
	},
	avatar: {
		width: 50,
		height: 50,
		marginLeft: 5,
		borderRadius: 4
	},
	content_img: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
	},
	content_emoji: {
        width: 20,
        height: 20,
        marginLeft: 10,
        resizeMode: 'contain',
	},
	contentWrapper: {
        display: 'flex',
		borderBottomWidth: 1,
		borderColor: '#cccccc',
	},
	content: {
        flex: 1,
		fontSize: 14,
		color: '#666666',
		padding: 10,
	},
	node_name: {
		backgroundColor: '#f5f5f5',
		color: '#778087',
		marginRight: 5
	},
	user: {
		color: '#666666',
		marginRight: 5,
		marginLeft: 5
	},
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});
