import { EndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/builders/endpoint.builder';
import { AbstractEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/builders/abstract-endpoint.builder';
import { PagingEndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/builders/paging-endpoint.builder';
import { Endpoint } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/value-objects/endpoint.model';

export abstract class AbstractPagingEndpointBuilder extends AbstractEndpointBuilder implements PagingEndpointBuilder {

  protected pageSize: number;

  public withPageSize(pageSize: number): EndpointBuilder {
    this.pageSize = pageSize;

    return this;
  }

  public build(): Endpoint {
    if (this.parameter) {
      this.url += `/${this.parameter}`;
    }

    if (this.action) {
      this.url += `/${this.action}`;
    }

    if (this.pageSize) {
      this.url += `?PageSize=${this.pageSize}`;
    }

    const endpoint = new Endpoint(this.url);
    this.url = '';

    return endpoint;
  }
}
