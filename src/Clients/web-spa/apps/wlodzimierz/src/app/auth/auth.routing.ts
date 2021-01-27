const authRouting: AuthRouting = {
  SignIn: 'sign-in',
  SignUp: 'signup',
  SignOut: 'sign-out'
};

interface AuthRouting {
  readonly SignIn: string;
  readonly SignUp: string;
  readonly SignOut: string;
}

export const AuthRouting: AuthRouting = authRouting;
