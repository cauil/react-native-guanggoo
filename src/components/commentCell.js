import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
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
                            return (
                            <View key={i}>
                                {innerv.img ? <Image style={Style.content_img} source={{uri: innerv.img}} /> : null}
                                {innerv.text ? <Text style={[Style.content, Style.comment_con]}>{innerv.text}</Text> : null}
                                {innerv.a ? <Text style={[Style.content, Style.comment_con]}>{innerv.a}</Text> : null}
                            </View>
                            )
                        })}
                    </View>
                </View>

            </View>
        );
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

