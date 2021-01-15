const BaseAddress = 'https://localhost:5001';
const BaseApiAddress = `${BaseAddress}/api`;

const apiControllers: ApiControllers = {
  Users: `${BaseApiAddress}/Users`,
  ConversationMessages: `${BaseApiAddress}/ConversationMessages`,
  Conversations: `${BaseApiAddress}/Conversations`,
};

const apiEndpoints: ApiEndpoints = {
  UsersSignIn: `${apiControllers.Users}/signin`,
  UsersSignUp: `${apiControllers.Users}/signup`,
  UsersVerify: `${apiControllers.Users}/verify`,
  ConversationMessages: `${apiControllers.Conversations}/conversation-messages`,
};

interface ApiEndpoints {
  readonly UsersSignIn: string;
  readonly UsersSignUp: string;
  readonly UsersVerify: string;
  readonly ConversationMessages: string;
}

interface ApiControllers {
  readonly Users: string;
  readonly ConversationMessages: string;
  readonly Conversations: string;
}

export const ApiControllers: ApiControllers = apiControllers;
export const ApiEndpoints: ApiEndpoints = apiEndpoints;

export interface EndpointBuilder {
  withController(controller: string): EndpointBuilder;

  withParameter(parametr: string): EndpointBuilder;

  withAction(action: string): EndpointBuilder;

  build(): string;
}

export class ApiEndpointBuilder implements EndpointBuilder {

  protected controller = '';
  protected parameter = '';
  protected action = '';

  public withController(controller: string): EndpointBuilder {
    this.controller = controller;

    return this;
  }

  public withParameter(parameter: string): EndpointBuilder {
    this.parameter = parameter;

    return this;
  }

  public withAction(action: string): EndpointBuilder {
    this.action = action;

    return this;
  }

  public build(): string {
    return `${this.controller}/${this.parameter}/${this.action}`;
  }
}
