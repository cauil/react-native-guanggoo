import Toast from 'react-native-root-toast';

const serializeJSON = function(data) {
  return Object.keys(data).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&');
}

const getUUID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
    }).replace('-', '');
}

const myToast = function(msg, cb=function() {}) {
    let toast = Toast.show(msg, {
        duration: 1000,
        position: 0,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            cb();
            // calls on toast\`s hide animation end.
        }
    });
}

export {
    serializeJSON,
    getUUID,
    myToast,
}
