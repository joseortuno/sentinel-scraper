"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
class Url {
    constructor(url) {
        if (!URL_REGEX.test(url))
            throw TypeError(`The instance of Url expects a valid parameter`);
        this.url = url;
    }
    toString() {
        return this.url.toString();
    }
}
exports.Url = Url;
