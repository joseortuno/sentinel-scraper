export class Selector {
  private selector;

  constructor(selector: string) {
    if (typeof selector !== "string")
      throw TypeError(
        `Selector expect a string. ${selector} is a ${typeof selector}.`
      );

    this.selector = selector;
  }

  public toString() {
    return this.selector.toString();
  }
}
