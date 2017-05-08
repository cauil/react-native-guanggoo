import { AsyncStorage } from 'react-native';

import {getHtml} from '../utils/api';
import {parseUserInfo} from '../utils/data';

const debug = true

export default async function isLogin(url='http://www.guanggoo.com') {
    const value = await AsyncStorage.getItem('username')
    if (value !== null){
        if(debug) {
            console.log('debug: Get storage data: ')
            console.log(JSON.parse(value))
        }

        const obj = JSON.parse(value)
        if(obj.logined) {
            const data = {type: 'home'}
            getHtml(data).then( (result) => {
                const info = parseUserInfo(result)
                if(!info) {
                    if(debug) {
                        console.log('debug: cookie expires')
                    }
                    CookieManager.clearByName(url, (err, res) => {
                        if(debug) {
                            console.log('cookie cleared!');
                            console.log(err);
                            console.log(res);
                        }
                        return (info? true : false)
                    })
                }
            })
        } else {
            return false
        }
    } else {
        return false
    }
}
