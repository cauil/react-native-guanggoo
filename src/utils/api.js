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
    let url = '';
    if(type === 'home') {
        url = 'http://www.guanggoo.com'
    } else {
        url = `${api[type]}${name}${pageNum ? ((type==='node' ? '?p=' : '&p=') + (pageNum)) : ''}`
    }

      return fetch(url, {
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;',
            'Content-Type': 'application/x-www-form-urlencoded',
            //'cookie':  'user=',
          },
      })
      .then((response) => response.text())
      .then((responseJson) => {
            return responseJson;
            console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
}

export {
    getHtml,
}
