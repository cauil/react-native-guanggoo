import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableHighlight,
    PixelRatio
} from 'react-native';

import {nodes_data, needLoginNodes} from '../utils/const';
import TopicList from './topicList';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class Nodes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: nodes_data,
            loaded: false
        };
    }
    componentWillMount() {
        Icon.getImageSource('share', 20).then((source) => this.setState({ shareIcon: source }));
        Icon.getImageSource('arrow-left', 20).then((source) => this.setState({ backIcon: source }));
    }
    render() {
        const nodes = this.state.nodes;
        return (
            <ScrollView style={Style.scollView}>
                {nodes.map((v, i) => {
                    return (
                    <View style={Style.container} key={i}>
                        <Text style={Style.nodeType}>{v.name}</Text>
                        {this.renderNodesAuto.bind(this)(v.list)}
                    </View>
                    )
                })}
            </ScrollView>
        );
    }
    renderNodesAuto(nodes){
        const n = Math.ceil(nodes.length/3);
        const r = [];
        for (let i = 1; i <= n; i++) {
            r.push(nodes.slice((i-1)*3, i*3));
        };
        return r.map(this.renderNodes.bind(this));
    }
    renderNodes(nodes, i){
        return (
            <View key={i} style={Style.nodes}>
                {nodes.map(this.renderNodeCell.bind(this))}
            </View>
        );
    }
    renderNodeCell(data, i){
        return (
            <TouchableHighlight key={i}
                onPress={
                    () => this.selectNode(data)
                }
                underlayColor={'#eeeeee'}>
                <View style={Style.nodeWrapper}>
                    <Text style={Style.node}>
                        {data.name}
                    </Text>
                </View>
            </TouchableHighlight>

        );
    }
    selectNode(data){
        this.props.navigator.push({
          title: data.name,
          leftButtonIcon: this.state.backIcon,
          onLeftButtonPress: this.props.navigator.pop,
          component: TopicList,
          passProps: {type: 'node', name: data.type},
          showTabBar: false,
        });
    }
}

const Style = StyleSheet.create({
    scollView: {
        backgroundColor: 'white',
        marginTop: 1,
        marginBottom: 50,
    },
    container: {
        backgroundColor: 'white',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderTopColor: '#98acdf',
        borderTopWidth: 1,
    },
    nodeType: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#98acdf',
    },
    nodes: {
        width: '100%',
        flex: 1,
        padding: 8,
        flexDirection: 'row',
    },
    nodeWrapper: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8,
        margin: 5,
        borderRadius: 5,
        borderColor: '#98acdf',
        borderWidth: 1,
        width: PixelRatio.get() === 3 ? 124 : PixelRatio.getPixelSizeForLayoutSize(55),
    },
    node: {
        fontSize: 12,
        textAlign: 'left',
        color: '#666E74'
        //color: '#98acdf',
    },

});
