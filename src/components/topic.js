import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    ActivityIndicator
} from 'react-native';

import CommentCell from './commentCell';
import {getHtml} from '../utils/api';
import {parseTopicData} from '../utils/data';

import {Style} from './topicSheet';
import {needLoginNodes, needLoginView} from '../utils/const';

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
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            needLogin,
        };
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        if(this.state.needLogin) {
            return (
                <needLoginView />
            )
        } else if(this.state.loaded) {
            return (
            <View style={{flex:1, marginTop: 65}}>
                {this.renderTopicHeader()}
                {this.renderLoaded()}
            </View>
            )
            return this.renderList();
        } else {
            return (
                <ActivityIndicator animating={true}  color="#356DD0" style={[Style.centering], {height: 80, marginTop: 100}} size="large" />
            );
        }
    }
    getData() {
        if(this.state.needLogin) {return;}

        const data = {type: this.props.type, name: this.state.topicNum};
        getHtml(data).then( (result) => {
            const {comment, content} = parseTopicData(result);
            this.setState({
                loaded: true,
                dataSource: this.state.dataSource.cloneWithRows(comment),
                content,
            })
        });
    }
    renderLoaded() {
        return (
            <ListView renderHeader={this.renderTopicContent.bind(this)}
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
                {v.img ? <Image style={Style.content_img} source={{uri: v.img}} /> : null}
                {v.text ? <Text style={Style.content}>{v.text}</Text> : null}
                {v.a ? <Text style={Style.content}>{v.a}</Text> : null}
            </View>
        )
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
            return <View style={{height: 50}} ><Text></Text></View>;
        }

        return <ActivityIndicator animating={true}  color="#356DD0" style={{height: 80, marginBottom: 200}} size="large" />
    }
}

