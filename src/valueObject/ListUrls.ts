import { Url } from './Url';

export class ListUrls {
  private urlArray: string[];

  constructor(urlArray: Array<string>) {
    
    this.urlArray = urlArray.map((url) => {
      const currentUrl = new Url(url);
      return currentUrl.toString();
    });
  }

  public get () {
    return this.urlArray;
  }
}
