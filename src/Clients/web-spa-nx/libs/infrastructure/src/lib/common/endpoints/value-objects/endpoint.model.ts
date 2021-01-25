export class Endpoint {

  private readonly initialUrl: string;

  public constructor(public url: string) {
    this.initialUrl = url;
  }

  public appendParameter(parameter: string): void {
    if (!parameter) {
      return;
    }

    this.url += `/${parameter}`;
  }

  public appendAction(action: string): void {
    if (!action) {
      return;
    }

    this.url += `/${action}`;
  }

  public build(): string {
    return this.url;
  }

  public reset(): void {
    this.url = this.initialUrl;
  }
}
