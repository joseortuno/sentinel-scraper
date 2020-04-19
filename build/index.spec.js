"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("./index");
describe("Scraper - Scraping tool", function () {
    describe("Test happy path Scraper tool", function () {
        it("Should save as property the document of the DOM", function () {
            var heman = new index_1.Scraper("https://www.he-man.org/collecting/toycollection.php?id=1");
            chai_1.expect(heman.document).to.exist;
            chai_1.expect(heman.document instanceof Object).to.be.true;
        });
        describe.only("select method", function () {
            var heman;
            before(function () {
                heman = new index_1.Scraper("https://www.he-man.org/collecting/toycollection.php?id=1");
            });
            it("Should return an array of elements", function () {
                var selector = heman.select(".tblrow", function (item) { return item.children.item(1).children.item(0).href; });
                chai_1.expect(selector).to.exist;
            });
            it("Should iterate over the item to be able to scraped", function () {
                var data = {};
                heman.select(".tblrow", function (item, index) {
                    chai_1.expect(index).to.exist;
                    data[index] = [item.children.item(1).children.item(0).href];
                });
                chai_1.expect(data).to.exist;
            });
        });
        describe("static for meyhod", function () {
            var heman, urls, completeUrls = [];
            var generalUrl = "https://www.he-man.org/collecting/";
            before(function () {
                heman = new index_1.Scraper("https://www.he-man.org/collecting/toycollection.php?id=1");
                urls = heman.select(".tblrow", function (item) { return item.children.item(1).children.item(0).href; });
                urls.forEach(function (url) {
                    completeUrls.push(generalUrl.concat(url));
                });
            });
            it("Should go throuth an array of urls ", function () {
                var data = [];
                var selectUrls = completeUrls.slice(0, 5);
                index_1.Scraper.for(selectUrls, function (scraper) {
                    var detail = scraper.select("#collect_rightcenter", function (item) {
                        return item.children
                            .item(0)
                            .children.item(1)
                            .children.item(0)
                            .children.item(0)
                            .children.item(0)
                            .children.item(0)
                            .children.item(0)
                            .children.item(0)
                            .children.item(1).textContent;
                    });
                    data.push(detail);
                });
                chai_1.expect(data).to.exist;
            });
            it("Should work by concatenating the url", function () {
                var data = [];
                var selectUrls = urls.slice(0, 5);
                index_1.Scraper.for(selectUrls, function (scraper) {
                    var detail = scraper.select("#collect_rightcenter", function (item) {
                        return item.children
                            .item(0)
                            .children.item(1)
                            .children.item(0)
                            .children.item(0)
                            .children.item(0)
                            .children.item(0)
                            .children.item(0)
                            .children.item(0)
                            .children.item(1).textContent;
                    });
                    data.push(detail);
                });
                chai_1.expect(data).to.exist;
            });
            it("Should return the parameters index and return url", function () {
                var selectUrls = urls.slice(0, 5);
                var expectUrls = completeUrls.slice(0, 5);
                index_1.Scraper.for(selectUrls, function (scraper, index, url) {
                    chai_1.expect(scraper instanceof Object).to.be.true;
                    chai_1.expect(index).to.exist;
                    chai_1.expect(expectUrls[index]).to.equal(url);
                });
            });
        });
    });
    it("Scraper - parameter: URL. Should return error when not insert a url", function () {
        chai_1.expect(function () { return new index_1.Scraper("error"); }).to.throw(TypeError, "The instance of Scraper expect at parameter a url.");
    });
    it("Scraper - method static for - parameter: URLS. Should return error when insert an empty array", function () {
        chai_1.expect(function () {
            index_1.Scraper.for([], function () { });
        }).to.throw(ReferenceError, "There aren't elements in the array urls.");
    });
    it("Scraper - method static for - parameter: URLS. Should return error when not insert an array with url", function () {
        chai_1.expect(function () {
            index_1.Scraper.for(["error"], function () { });
        }).to.throw(TypeError, "The element 0 of the array is not a url.");
    });
});
//# sourceMappingURL=index.spec.js.map