const cheerio = require('cheerio-without-node-native');

import {AsyncStorage} from 'react-native';
const CookieManager = require('react-native-cookies')

function parseUserInfo(html) {
    const $ = cheerio.load(html)
    const ele = document.querySelector('.ui-header .username').text()
    const topic_num = $('.ui-content .status-topic a').text()
    const topic_url = $('.ui-content .status-topic a').attr('href')
    const reply_num = $('.ui-content .status-reply a').text()
    const reply_url = $('.ui-content .status-reply a').attr('href')
    const favor_num = $('.ui-content .status-favorites a').text()
    const favor_url = $('.ui-content .status-favorites a').attr('href')
    const repu_num = $('.ui-content .status-reputation a').text()
    const repu_url = $('.ui-content .status-reputation a').attr('href')

    if(ele) {
        const obj = {
            logined,
            username,
            topic_num,
            topic_url,
            reply_num,
            reply_url,
            favor_num,
            favor_url,
            repu_num,
            repu_url,
        }
        const value = await AsyncStorage.mergeItem('http://www.guanggoo.com', JSON.stringify(obj))
        if(value) {
            return obj
        }
    } else {
        return false
    }
}

function parseListData(html) {
    const result = [];
    const $ = cheerio.load(html);
    $('.topic-item').each((i, v) => {
        const $ = cheerio.load(v);
        const obj = {};
        obj.avatar = $('.avatar').attr('src');
        obj.title = $('.title a').text();
        obj.url = $('.title a').attr('href');
        obj.node = $('.node a').text();
        obj.nodeType = $('.node a').attr('href').split('/')[2];
        obj.username = $('.username a').text();
        obj.last_touched = $('.last-touched').text();
        if($('.last-reply-username a strong').text()) {
            obj.last_reply_username = $('.last-reply-username a strong').text();
        }
        if($('.count a').text()) {
            obj.count = $('.count a').text();
        }
        result.push(obj);
    });
    return result;
}

function parseTopicData(html) {
    let $ = cheerio.load(html);
    const content = [];
    const content_obj = $('.topic-detail .ui-content p');
    const content_html = $('.topic-detail .ui-content');
    const testhtml = content_html.toString();
    for(let i = 0, len = content_obj.length; i < len; i++) {
        const obj = content_obj.eq(i);
        const text = obj.text();
        const img = obj.find('img').attr('src');
        content.push({text, img});
    }

    const comment = [];
    const comment_obj = $('.topic-reply .reply-item');
    for(let i = 0, len = comment_obj.length; i < len; i++) {
        const obj = comment_obj.eq(i);
        const avatar = obj.find('.avatar').attr('src');
        const name = obj.find('.username').text();
        const time = obj.find('.time').text();
        const floor = obj.find('.floor').eq(0).text();
        const votecount = obj.find('.J_replyVote').text();

        const content = [];
        const content_obj = obj.find('.content p');
        for(let i = 0, len = content_obj.length; i < len; i++) {
            const innerobj = content_obj.eq(i);
            const text = innerobj.text();
            const img = innerobj.find('img').attr('src');
            content.push({text, img});
        }
        comment.push({name, avatar, time, floor, votecount, content});
    }
    return {content, comment};
}

export {
    parseListData,
    parseTopicData,
}
