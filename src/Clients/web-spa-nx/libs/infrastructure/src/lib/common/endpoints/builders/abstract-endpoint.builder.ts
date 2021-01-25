import { EndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/builders/endpoint.builder';
import { Endpoint } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/value-objects/endpoint.model';

export abstract class AbstractEndpointBuilder implements EndpointBuilder {

  protected endpoint: Endpoint;

  protected constructor(protected baseAddress: string, protected controller: string) {
    this.endpoint = new Endpoint(`${baseAddress}/${controller}`);
  }

  public withParameter(parameter: string): EndpointBuilder {
    this.endpoint.appendParameter(parameter);

    return this;
  }

  public withAction(action: string): EndpointBuilder {
    this.endpoint.appendAction(action);

    return this;
  }

  public build(): string {
    const result = this.endpoint.build();
    this.endpoint.reset();

    return result;
  }
}
