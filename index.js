"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xmlhttprequest_1 = require("xmlhttprequest");
const jsdom_1 = require("jsdom");
const Url_1 = require("./src/valueObject/Url");
const ListUrls_1 = require("./src/valueObject/ListUrls");
const Selector_1 = require("./src/valueObject/Selector");
const IteratorSelector_1 = require("./src/valueObject/IteratorSelector");
class Scraper {
    constructor(url) {
        this.url = new Url_1.Url(url);
        const request = new xmlhttprequest_1.XMLHttpRequest();
        request.open("GET", this.url.toString(), false);
        request.onload = () => {
            let { window: { document }, } = new jsdom_1.JSDOM(request.responseText);
            this.document = document;
        };
        request.send();
    }
    select(selector, iteratorSelector) {
        this.selector = new Selector_1.Selector(selector);
        this.iteratorSelector = new IteratorSelector_1.IteratorSelector(iteratorSelector);
        const results = this.document.querySelectorAll(this.selector.toString());
        const data = [];
        results.forEach((result, index) => {
            data.push(this.iteratorSelector.get(result, index));
        });
        return data;
    }
    static for(listUrls, expression) {
        this.listUrls = new ListUrls_1.ListUrls(listUrls);
        this.iteratorSelector = new IteratorSelector_1.IteratorSelector(expression);
        listUrls.forEach((url, index) => {
            const scraper = new Scraper(url);
            expression(scraper, index, url);
        });
    }
}
exports.Scraper = Scraper;
