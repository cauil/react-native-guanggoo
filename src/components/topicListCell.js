import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image,
} from 'react-native';

import {Style} from './topicListCellSheet';
export default class TopicListCell extends Component {
    render() {
        const data = this.props.data;
        return (
            <TouchableHighlight onPress={this.props.onSelect} underlayColor={'#eeeeee'}>
                <View style={Style.container}>
                    <Image style={Style.avatar}
                    source={{
                        uri: data.avatar
                    }} />

                    <View style={Style.topic}>
                        <Text style={Style.title}>
                            {data.title}
                        </Text>
                        {this.renderInfo()}
                    </View>

                    {this.renderCommentCount()}
                </View>
            </TouchableHighlight>
        );
    }
    renderCommentCount() {
        const data = this.props.data;
        if(data.count){
            var comment_width = 24 + data.count.toString().length * 8;
            return (
                    <View style={Style.replyNumWrapper}>
                        <View style={[Style.replyNum, {width: comment_width}]}>
                            <Text style={Style.replyNumText}>{data.count}</Text>
                        </View>
                    </View>
                );
        }
        return;
    }

    renderInfo() {
        const data = this.props.data;
        if(data.last_touched){
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
}
