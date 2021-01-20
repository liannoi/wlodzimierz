import {environment} from '../../../../environments/environment';

const BaseApiAddress = environment.api_url;

const apiControllers: ApiControllers = {
  Users: `${BaseApiAddress}/Users`,
};

const apiEndpoints: ApiEndpoints = {
  UsersSignIn: `${apiControllers.Users}/signin`,
  UsersSignUp: `${apiControllers.Users}/signup`,
  UsersVerify: `${apiControllers.Users}/verify`,
};

interface ApiEndpoints {
  readonly UsersSignIn: string;
  readonly UsersSignUp: string;
  readonly UsersVerify: string;
}

interface ApiControllers {
  readonly Users: string;
}

export const ApiControllers: ApiControllers = apiControllers;
export const ApiEndpoints: ApiEndpoints = apiEndpoints;
