const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const jsdom = require('jsdom');
const { JSDOM } = jsdom
const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const ProgressBar = require('progress');

module.exports = class Scraper {
  constructor(url) {
    if(arguments.length === 0) throw ReferenceError(`The instance of Scraper expect a parameter.`);
    if(typeof(url) !== 'string') throw TypeError(`Url expect a string. ${url} is a ${typeof(url)}.`);
    if(!URL_REGEX.test(url)) throw TypeError(`The instance of Scraper expect at parameter a url.`);

    const request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.onload = () => {
      let { window: { document } } = new JSDOM(request.responseText);

      this.document = document;
    }
    request.send();
  }

  select(selector, expression) {
    if(arguments.length === 0) throw ReferenceError(`The method select need parameters: selector and expression.`);
    if(typeof(selector) !== 'string') throw TypeError(`Selector expect a string. ${selector} is a ${typeof(selector)}.`);
    if(!arguments[1]) throw ReferenceError(`The method select need a expression.`);
    if(typeof(expression) !== 'function') throw TypeError(`Expression expect a function. ${expression} is a ${typeof(expression)}.`);

    const results = this.document.querySelectorAll(selector);

    const data = [];
    results.forEach(result => {
      data.push(expression(result));
    })
    return data;
  }

  static for(urls, expression) {

    const bar = new ProgressBar('Scraper.for() run [:bar] :percent :etas', {
      complete: '▓',
      incomplete: '░',
      width: 20,
      total: urls.length
    });

    if(arguments.length === 0) throw ReferenceError(`The static method for need parameters: urls and expression.`);
    if(urls.length === 0) throw ReferenceError(`There aren't elements in the array urls.`);
    if(!(urls instanceof Array)) throw TypeError(`Urls expect a array. ${urls} is a ${typeof(urls)}.`);
    if(!arguments[1]) throw ReferenceError(`The static method for need a expression.`);
    if(typeof(expression) !== 'function') throw TypeError(`Expression expect a function. ${expression} is a ${typeof(expression)}.`);

    urls.forEach((url, index) => {
      bar.tick();
      if(!URL_REGEX.test(url)) throw TypeError(`The element ${index} of the array is not a url.`);
      
      const scraper = new Scraper(url);
      expression(scraper);
    });

  }

}