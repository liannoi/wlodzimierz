const authRoutingConstants: AuthRoutingConstants = {
  SignIn: 'sign-in',
  SignUp: 'sign-up',
  SignOut: 'sign-out',
};

interface AuthRoutingConstants {
  readonly SignIn: string;
  readonly SignUp: string;
  readonly SignOut: string;
}

export const AuthRoutingConstants: AuthRoutingConstants = authRoutingConstants;
