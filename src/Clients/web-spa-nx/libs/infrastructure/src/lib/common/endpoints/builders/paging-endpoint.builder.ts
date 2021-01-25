import { EndpointBuilder } from '@wlodzimierz/infrastructure/src/lib/common/endpoints/builders/endpoint.builder';

export interface PagingEndpointBuilder extends EndpointBuilder {

  withPageSize(pageSize: number): EndpointBuilder;
}
