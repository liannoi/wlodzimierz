export interface EndpointBuilder {

  withParameter(parameter: string): EndpointBuilder;

  withAction(action: string): EndpointBuilder;

  build(): string;
}
