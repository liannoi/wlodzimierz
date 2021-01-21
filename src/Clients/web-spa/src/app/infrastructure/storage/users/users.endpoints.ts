import {environment} from '../../../../environments/environment';

const BaseAddress = environment.api_url;
const Controller = `${BaseAddress}/Users`;

const authEndpoints: AuthEndpoints = {
  SignIn: `${Controller}/signin`,
  SignUp: `${Controller}/signup`,
  Verify: `${Controller}/verify`,
};

interface AuthEndpoints {
  readonly SignIn: string;
  readonly SignUp: string;
  readonly Verify: string;
}

export const UsersController: string = Controller;
export const UsersEndpoints: AuthEndpoints = authEndpoints;
