// Libs
import { XMLHttpRequest } from "xmlhttprequest";
import { JSDOM } from "jsdom";

// Values
import { Url } from "./valueObject/Url";
import { ListUrls } from "./valueObject/ListUrls";
import { Selector } from "./valueObject/Selector"
import { IteratorSelector } from "./valueObject/IteratorSelector"

export class Scraper {
  public document: Document;
  private url: Url;
  static listUrls: ListUrls;
  private selector: Selector;
  private iteratorSelector: IteratorSelector;
  static iteratorSelector: IteratorSelector;

  constructor(url: string) {
    this.url = new Url(url);

    const request: XMLHttpRequest = new XMLHttpRequest();
    request.open("GET", this.url.toString(), false);
    request.onload = () => {
      let {
        window: { document },
      } = new JSDOM(request.responseText);

      this.document = document;
    };
    request.send();
  }

  public select(selector: string, iteratorSelector: Function): void | Array<any> {
    this.selector = new Selector(selector);
    this.iteratorSelector = new IteratorSelector(iteratorSelector);

    const results = this.document.querySelectorAll(this.selector.toString());

    const data: Array<any> = [];
    
    results.forEach((result, index) => {
      data.push(this.iteratorSelector.get(result, index));
    });
    
    return data;
  }

  public static for(listUrls: Array<string>, expression: Function): void {
    this.listUrls = new ListUrls(listUrls);
    this.iteratorSelector = new IteratorSelector(expression);

    listUrls.forEach((url, index) => {
      const scraper = new Scraper(url);
      expression(scraper, index, url);
    });
  }
}
