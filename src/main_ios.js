import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';

import TopicList from './components/topicList';
import Nodes from './components/nodes';

export default class guanggoo extends Component {
    static title = '光谷社区';
    static description = '光谷社区 navigation.';
    static displayName = 'TabBarExample';

    state = {
        selectedTab: 'lastest',
    };
    render() {
        return (
            <TabBarIOS
                unselectedTintColor="yellow"
                tintColor="white"
                unselectedItemTintColor="red"
                barTintColor="darkslateblue">
                <TabBarIOS.Item
                  title="最新"
                  systemIcon="most-recent"
                  selected={this.state.selectedTab === 'lastest'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'lastest',
                    });
                  }}>
                    <NavigatorIOS style={Style.container}
                        tintColor={'#333344'}
                        initialRoute={{
                          title: '最新主题',
                          component: TopicList,
                          passProps: {name: 'lastest', type: 'tab'}
                        }}
                        itemWrapperStyle={Style.navigator} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                  title="精华"
                  systemIcon="featured"
                  selected={this.state.selectedTab === 'featured'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'featured',
                    });
                  }}>
                    <NavigatorIOS style={Style.container}
                        tintColor={'#333344'}
                        initialRoute={{
                          title: '精华主题',
                          component: TopicList,
                          passProps: {name: 'elite', type: 'tab'}
                        }}
                        itemWrapperStyle={Style.navigator} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                  title="节点"
                  systemIcon="more"
                  selected={this.state.selectedTab === 'more'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'more',
                    });
                  }}>
                    <NavigatorIOS style={Style.container}
                        tintColor={'#333344'}
                        initialRoute={{
                          title: '节点分类',
                          component: Nodes,
                          passProps: {},
                        }}
                        itemWrapperStyle={Style.navigator} />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                  title="全部"
                  systemIcon="bookmarks"
                  selected={this.state.selectedTab === 'all'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'all',
                    });
                  }}>
                  <View><Text>more</Text></View>
                </TabBarIOS.Item>
              </TabBarIOS>
        );
    }
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7EAEC'
  },
  navigator: {
    backgroundColor: '#E7EAEC'
  },
});
