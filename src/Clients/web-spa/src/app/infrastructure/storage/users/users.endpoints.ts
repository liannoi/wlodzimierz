import {environment} from '../../../../environments/environment';

const BaseAddress = environment.api_url;
const Controller = `${BaseAddress}/Users`;

const authEndpoints: AuthEndpoints = {
  UsersSignIn: `${Controller}/signin`,
  UsersSignUp: `${Controller}/signup`,
  UsersVerify: `${Controller}/verify`,
};

interface AuthEndpoints {
  readonly UsersSignIn: string;
  readonly UsersSignUp: string;
  readonly UsersVerify: string;
}

export const UsersController: string = Controller;
export const UsersEndpoints: AuthEndpoints = authEndpoints;
