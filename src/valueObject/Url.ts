const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export class Url {
  private url: string;

  constructor(url: string) {
    if (arguments.length === 0)
      throw ReferenceError(`The instance of Scraper expect a parameter.`);
    if (typeof url !== "string")
      throw TypeError(`Url expect a string. ${url} is a ${typeof url}.`);
    if (!URL_REGEX.test(url))
      throw TypeError(`The instance of Scraper expect at parameter a url.`);

    this.url;
  }

  public toString() {
    return this.url.toString();
  }
}