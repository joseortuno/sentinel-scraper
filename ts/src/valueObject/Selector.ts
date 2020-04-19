export class Selector {
  private selector;

  constructor(selector: string) {

    this.selector = selector;
  }

  public toString() {
    return this.selector.toString();
  }
}
