import { EndpointBuilder } from '@wlodzimierz/application/src/lib/common/endpoints/endpoint.builder';
import { Endpoint } from '@wlodzimierz/application/src/lib/common/endpoints/endpoint.model';

export abstract class AbstractEndpointBuilder implements EndpointBuilder {

  private readonly initialUrl: string;
  private parameter: string;
  private action: string;
  private pageSize: number;

  protected constructor(private baseAddress: string, private controller: string) {
    this.initialUrl = `${baseAddress}/${controller}`;
  }

  public withParameter(parameter: string): EndpointBuilder {
    if (!parameter) {
      this.parameter = '';
      return this;
    }

    this.parameter = parameter;

    return this;
  }

  public withAction(action: string): EndpointBuilder {
    if (!action) {
      return this;
    }

    this.action = action;

    return this;
  }

  public withPageSize(pageSize: number): EndpointBuilder {
    if (pageSize <= 0) {
      return this;
    }

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

    return new Endpoint(result);
  }
}
