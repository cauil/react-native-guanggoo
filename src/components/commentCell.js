import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Linking,
    TouchableHighlight,
} from 'react-native';

export default class commentCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const data = this.props.data;
        return (
            <View style={Style.container}>
                <Image style={Style.avatar}
                    source={{
                        uri: data.avatar
                    }} />

                <View style={Style.content}>
                    <View style={Style.infobar}>
                        <Text style={Style.nickname}>
                            {data.name}
                        </Text>

                        <Text style={Style.info}>
                            {data.time}
                        </Text>
                        <Text style={Style.info}>
                            {data.votecount}
                        </Text>
                        <Text style={Style.info}>
                            {data.floor}
                        </Text>
                    </View>

                    <View>
                        {data.content.map((innerv, i) => {
                            return this.cell(innerv, i);
                        })}
                    </View>
                </View>

            </View>
        );
    }
    cell(innerv, i) {
        let is_absolute_url = false;
        if(innerv.img && innerv.img.indexOf('http') === -1) {
            is_absolute_url = true;
            innerv.img = 'http://www.guanggoo.com' + innerv.img;
        }
        if(is_absolute_url) {
            return (
            <View key={i}>
                {innerv.text ? <Text style={[Style.content, Style.comment_con]}>{innerv.text}</Text> : null}
                {innerv.img ? <Image style={Style.content_emoji} source={{uri: innerv.img}} /> : null}
            </View>
            )
        } else {
            return (
            <View key={i}>
                {innerv.text ? <Text style={[Style.content, Style.comment_con]}>{innerv.text}</Text> : null}
                {innerv.img ? 
                    (<TouchableHighlight underlayColor='#cccccc' style={Style.img_container} onPress={() => { Linking.openURL(innerv.img) }}>
                        <Image style={Style.content_img} source={{uri: innerv.img}} />
                    </TouchableHighlight>)
                : null}
            </View>
            )
        }
    }
}

const Style = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderColor: '#eeeeee',
    },
    infobar: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    content: {
        flex: 1,
        marginBottom: 5,
        marginLeft: 7,
    },
    img_container: {
        width: 200,
        height: 200,
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
    comment_con: {
        fontSize: 12,
        marginLeft: 7,
        color: '#666666',
    },
    nickname: {
        fontSize: 12,
        color: '#356DD0',
        marginLeft: 7,
    },
    info: {
        fontSize: 12,
        marginLeft: 5,
        color: '#666666',
    },
    comment: {
        fontSize: 12,
        color: '#666666',
        paddingTop: 5,
        marginRight: 10
    },
    avatar: {
        width: 30,
        height: 30,
        marginLeft: 5,
        borderRadius: 4
    },
});

