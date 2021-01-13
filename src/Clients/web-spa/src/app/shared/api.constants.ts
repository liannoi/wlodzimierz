const BaseAddress = 'https://localhost:5001';
const BaseApiAddress = `${BaseAddress}/api`;

const apiControllers: ApiControllers = {
  Users: `${BaseApiAddress}/users`
};

const apiEndpoints: ApiEndpoints = {
  UsersSignIn: `${apiControllers.Users}/signin`,
  UsersSignUp: `${apiControllers.Users}/signup`
};

interface ApiEndpoints {
  readonly UsersSignIn: string;
  readonly UsersSignUp: string;
}

interface ApiControllers {
  readonly  Users: string;
}

export const ApiControllers: ApiControllers = apiControllers;
export const ApiEndpoints: ApiEndpoints = apiEndpoints;
