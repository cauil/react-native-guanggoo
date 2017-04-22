const cheerio = require('cheerio-without-node-native');

function parseData(html) {
    const result = [];
    const $ = cheerio.load(html);
    $('.topic-item').each((i, v) => {
        const $ = cheerio.load(v);
        const obj = {};
        obj.avatar = $('.avatar').attr('src');
        obj.title = $('.title a').text();
        obj.url = $('.title a').attr('href');
        obj.node = $('.node a').text();
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

export {
    parseData,
}
