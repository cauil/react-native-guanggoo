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
import User from './components/user';
import Icon, {TabBarItemIOS} from 'react-native-vector-icons/SimpleLineIcons';

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
                unselectedTintColor="#555"
                tintColor="#98acdf"
                unselectedItemTintColor="#555"
                barTintColor="white">
                <TabBarItemIOS
                  title="最新"
                  iconName="fire"
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
                          passProps: {name: 'lastest', type: 'tab'},
                          showTabBar: true,
                        }}
                        itemWrapperStyle={Style.navigator} />
                </TabBarItemIOS>
                <TabBarItemIOS
                  title="精华"
                  iconName="heart"
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
                          passProps: {name: 'elite', type: 'tab'},
                          showTabBar: true,
                        }}
                        itemWrapperStyle={Style.navigator} />
                </TabBarItemIOS>
                <TabBarItemIOS
                  title="节点"
                  iconName="tag"
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
                          showTabBar: true,
                        }}
                        itemWrapperStyle={Style.navigator} />
                </TabBarItemIOS>
                <TabBarItemIOS
                  title="用户"
                  iconName="user"
                  selected={this.state.selectedTab === 'all'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'all',
                    });
                  }}>
                  <User />
                </TabBarItemIOS>
              </TabBarIOS>
        );
    }
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7EAEC',
  },
  navigator: {
    backgroundColor: '#E7EAEC',
  },
});
