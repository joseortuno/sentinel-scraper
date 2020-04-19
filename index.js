"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xmlhttprequest_1 = require("xmlhttprequest");
var jsdom_1 = require("jsdom");
var Url_1 = require("./src/valueObject/Url");
var ListUrls_1 = require("./src/valueObject/ListUrls");
var Selector_1 = require("./src/valueObject/Selector");
var IteratorSelector_1 = require("./src/valueObject/IteratorSelector");
var Scraper = (function () {
    function Scraper(url) {
        var _this = this;
        this.url = new Url_1.Url(url);
        var request = new xmlhttprequest_1.XMLHttpRequest();
        request.open("GET", this.url.toString(), false);
        request.onload = function () {
            var document = new jsdom_1.JSDOM(request.responseText).window.document;
            _this.document = document;
        };
        request.send();
    }
    Scraper.prototype.select = function (selector, iteratorSelector) {
        var _this = this;
        this.selector = new Selector_1.Selector(selector);
        this.iteratorSelector = new IteratorSelector_1.IteratorSelector(iteratorSelector);
        var results = this.document.querySelectorAll(this.selector.toString());
        var data = [];
        results.forEach(function (result, index) {
            data.push(_this.iteratorSelector.get(result, index));
        });
        return data;
    };
    Scraper.for = function (listUrls, expression) {
        this.listUrls = new ListUrls_1.ListUrls(listUrls);
        this.iteratorSelector = new IteratorSelector_1.IteratorSelector(expression);
        listUrls.forEach(function (url, index) {
            var scraper = new Scraper(url);
            expression(scraper, index, url);
        });
    };
    return Scraper;
}());
exports.Scraper = Scraper;
