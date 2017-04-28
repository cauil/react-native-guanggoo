import React from 'react-native';

const base = 'http://www.guanggoo.com/';
const api = {
    tab: base + '?tab=',
    node: base + 'node/',
    topic: base + 't/'
};
/* 
 * {type: 'tab', name: 'lastest', pageNum: 1}
 * {type: 'base', name: 'city', pageNum: 1}
 * {type: 'topic', name: 111, pageNum: 1}
*/

function getHtml({type, name, pageNum}) {
    const url = `${api[type]}${name}${pageNum ? ('&p=' + pageNum) : ''}`
    console.log(url);

      return fetch(url, {
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
      })
      .then((response) => response.text())
      .then((responseJson) => {
            return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
      /*

    try {
        let response = await fetch('http://www.guanggoo.com', {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;',
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        debugger;
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson;
    } catch (error) {
        console.error(error);
        React.AlertIOS.alert(
          'error',
          '请求失败:'+error.message
        );
        return false;
    }
    */
}

export {
    getHtml,
}
