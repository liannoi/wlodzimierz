import { Endpoint } from '@wlodzimierz/application/src/lib/common/endpoints/endpoint.model';

export interface EndpointBuilder {

  withParameter(parameter: string): EndpointBuilder;

  withAction(action: string): EndpointBuilder;

  withPageSize(pageSize: number): EndpointBuilder;

  build(): Endpoint;
}
