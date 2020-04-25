"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Url_1 = require("./Url");
class ListUrls {
    constructor(urlArray) {
        this.urlArray = urlArray.map((url) => {
            const currentUrl = new Url_1.Url(url);
            return currentUrl.toString();
        });
    }
    get() {
        return this.urlArray;
    }
}
exports.ListUrls = ListUrls;
