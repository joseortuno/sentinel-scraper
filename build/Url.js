const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
module.exports = class Url {
    constructor(url) {
        if (!URL_REGEX.test(url))
            throw TypeError(`The instance of Scraper expect at parameter a url.`);
        this.url;
    }
};
