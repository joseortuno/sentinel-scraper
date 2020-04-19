export class IteratorSelector {
  private expression: Function;

  constructor(expression: Function) {
    if (typeof expression !== "function")
      throw TypeError(
        `Expression expect a function. ${expression} is a ${typeof expression}.`
      );

    this.expression = expression;
  }

  public get(result: any, index: number, url?: string): Function {
    return this.expression(result, index, url);
  }
}
