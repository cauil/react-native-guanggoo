import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image,
} from 'react-native';

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
            var comment_width = 20 + data.count.toString().length * 7;
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
}

const Style = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#E2E2E2'
    },
    avatar: {
        alignSelf: 'center',
        width: 50,
        height: 50,
        marginRight: 10,
        justifyContent: 'center',
        borderRadius: 3,
    },
    title: {
        fontSize: 14,
        textAlign: 'left',
        color: '#356DD0',
    },
    topic: {
        flex: 1,
        marginBottom: 5
    },
    info: {
        color: '#aaaaaa',
        fontSize: 12,
        textAlign: 'left',
        marginTop: 5,
    },
    content: {
        fontSize: 12,
        color: '#555555'
    },


    replyNumWrapper: {
        width: 30,
        height: 18,
        marginLeft: 5,
        marginRight: 2,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    replyNum: {
        backgroundColor: '#98acdf',
        flex: 1,
        alignItems: 'center',
        height: 18,
        justifyContent: 'center',
        borderRadius: 10,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 5,
    },
    replyNumText: {
        color: '#ffffff',
        fontWeight: 'bold'
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
    }
});
