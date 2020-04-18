import { Url } from './Url';

export class ListUrls {
  private urlArray: string[];

  constructor(urlArray: Array<string>) {
    if (!(urlArray instanceof Array))
      throw TypeError(
        `Urls expect a array. ${urlArray} is a ${typeof urlArray}.`
      );

    this.urlArray = urlArray.map((url) => {
      const currentUrl = new Url(url);
      return currentUrl.toString();
    });
  }

  public get () {
    return this.urlArray;
  }
}
