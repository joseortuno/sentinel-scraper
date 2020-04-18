"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
module.exports = class Scraper {
    constructor(url) {
        const request = new XMLHttpRequest();
        request.open('GET', url.toString(), false);
        request.onload = () => {
            let { window: { document } } = new JSDOM(request.responseText);
            this.document = document;
        };
        request.send();
    }
    select(selector, expression) {
        const results = this.document.querySelectorAll(selector);
        return results.map((result, index) => {
            return expression(result, index);
        });
    }
    for(urls, expression) {
        urls.forEach((url, index) => {
            const scraper = new Scraper(url);
            expression(scraper, index, url);
        });
    }
};
