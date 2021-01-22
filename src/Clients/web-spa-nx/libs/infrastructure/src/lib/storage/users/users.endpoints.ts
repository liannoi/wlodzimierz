const BaseAddress = 'https://localhost:5001/api';
const Controller = `${BaseAddress}/Users`;

const endpoints: Endpoints = {
  SignIn: `${Controller}/SignIn`,
  SignUp: `${Controller}/SignUp`,
  Verify: `${Controller}/Verify`
};

interface Endpoints {
  readonly SignIn: string;
  readonly SignUp: string;
  readonly Verify: string;
}

export const ApiAddress: string = BaseAddress;
export const UsersController: string = Controller;
export const UsersEndpoints: Endpoints = endpoints;
