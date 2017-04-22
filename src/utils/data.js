import cheerio from 'cheerio';

function parseData(html) {
    debugger;
    const result = [];
    const $ = cheerio.load(html);
    $('.topic-item').each((i, v) => {
        console.log(v);
    });
    return result;
}

export {
    parseData,
}
