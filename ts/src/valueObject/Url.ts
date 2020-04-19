const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export class Url {
  private url: string;

  constructor(url: string) {
    if (!URL_REGEX.test(url))
      throw TypeError(`The instance of Url expects a valid parameter`);

    this.url = url;
  }

  public toString() {
    return this.url.toString();
  }
}
