import { Endpoint } from './endpoint.model';

export interface EndpointBuilder {
  withParameter(parameter: string): EndpointBuilder;

  withAction(action: string): EndpointBuilder;

  withPageSize(pageSize: number): EndpointBuilder;

  build(): Endpoint;
}
