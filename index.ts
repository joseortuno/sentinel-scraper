import { Url } from "url";
const jsdom = require('jsdom');
const { JSDOM } = jsdom

interface Selector{
  selector: any;
 }

interface IScraper{
  document: any;
  select: (selector, expression) => Array<Object>;
  for: (urls, expression) => void;
}

module.exports = class Scraper implements IScraper{
  document
  constructor(url:Url) {
    
    const request = new XMLHttpRequest();
    request.open('GET', url.toString(), false);
    request.onload = () => {
      let { window: { document } } = new JSDOM(request.responseText);
  
      this.document = document;
    }
    request.send();
  }

  public select(selector : Selector, expression: Function) {
    
    const results = this.document.querySelectorAll(selector);

   return results.map((result, index) => {
      return expression(result, index);
    })
 
  }

 public for(urls: Array<Url>, expression: Function) {
    
    urls.forEach((url, index) => {
      const scraper = new Scraper(url);
      expression(scraper, index, url);
    });

  }

}