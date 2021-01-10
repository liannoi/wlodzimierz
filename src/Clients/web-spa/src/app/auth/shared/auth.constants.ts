const authenticationPaths: AuthenticationPaths = {
  SignUp: 'join',
  SignIn: 'login',
  SignOut: 'sign-out',
};

interface AuthenticationPaths {
  readonly SignIn: string;
  readonly SignUp: string;
  readonly SignOut: string;
}

export const AuthenticationPaths: AuthenticationPaths = authenticationPaths;
