var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;
module.exports = /** @class */ (function () {
    function Scraper(url) {
        var _this = this;
        var request = new XMLHttpRequest();
        request.open('GET', url.toString(), false);
        request.onload = function () {
            var document = new JSDOM(request.responseText).window.document;
            _this.document = document;
        };
        request.send();
    }
    Scraper.prototype.select = function (selector, expression) {
        var results = this.document.querySelectorAll(selector);
        return results.map(function (result, index) {
            return expression(result, index);
        });
    };
    Scraper.prototype["for"] = function (urls, expression) {
        urls.forEach(function (url, index) {
            var scraper = new Scraper(url);
            expression(scraper, index, url);
        });
    };
    return Scraper;
}());
