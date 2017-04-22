import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';

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
                  <View><Text>lastest</Text></View>
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
                  <View><Text>featured</Text></View>
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
                  <View><Text>more</Text></View>
                </TabBarIOS.Item>
              </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
