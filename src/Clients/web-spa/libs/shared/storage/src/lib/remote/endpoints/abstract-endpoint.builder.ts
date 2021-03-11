import { Endpoint } from './endpoint.model';
import { EndpointBuilder } from './endpoint.builder';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/wlodzimierz/src/environments/environment';

export abstract class AbstractEndpointBuilder implements EndpointBuilder {
  private readonly initialUrl: string;
  private parameter = '';
  private action: string;
  private pageSize: number;

  protected constructor(
    private controller: string,
    private endpoint = `${environment.endpoint}/api`
  ) {
    this.initialUrl = `${endpoint}/${controller}`;
  }

  public reset(): EndpointBuilder {
    this.parameter = '';
    this.action = '';
    this.pageSize = 0;

    return this;
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

    if (this.parameter) result += `/${this.parameter}`;
    if (this.action) result += `/${this.action}`;
    if (this.pageSize || this.pageSize > 0)
      result += `?PageSize=${this.pageSize}`;

    return { url: result };
  }
}
