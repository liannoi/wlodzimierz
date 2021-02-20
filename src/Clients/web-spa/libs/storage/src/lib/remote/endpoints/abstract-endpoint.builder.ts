import { Endpoint } from './endpoint.model';
import { EndpointBuilder } from './endpoint.builder';

export abstract class AbstractEndpointBuilder implements EndpointBuilder {
  private readonly initialUrl: string;
  private parameter = '';
  private action: string;
  private pageSize: number;

  protected constructor(private controller: string, private baseAddress: string = 'https://localhost:5001/api') {
    this.initialUrl = `${baseAddress}/${controller}`;
  }

  public withParameter(parameter: string): EndpointBuilder {
    if (!parameter) return this;
    this.parameter = parameter;

    return this;
  }

  public withAction(action: string): EndpointBuilder {
    if (!action) return this;
    this.action = action;

    return this;
  }

  public withPageSize(pageSize: number): EndpointBuilder {
    if (pageSize <= 0) return this;
    this.pageSize = pageSize;

    return this;
  }

  public build(): Endpoint {
    let result = this.initialUrl;

    if (this.parameter) {
      result += `/${this.parameter}`;
    }

    if (this.action) {
      result += `/${this.action}`;
    }

    if (this.pageSize) {
      result += `?PageSize=${this.pageSize}`;
    }

    return { url: result };
  }
}
