const applicationOptions: ApplicationOptions = {
  Name: 'Wlodzimierz'
};

const applicationPaths: ApplicationPaths = {
  Home: '',
  Signup: 'auth/signup',
  Docs: 'docs',
  Apps: 'apps',
  Feedback: 'feedback',
  Api: 'api'
};

interface ApplicationOptions {
  readonly Name: string;
}

interface ApplicationPaths {
  readonly Home: string;
  readonly Signup: string;
  readonly Docs: string;
  readonly Apps: string;
  readonly Feedback: string;
  readonly Api: string;
}

export const ApplicationPaths: ApplicationPaths = applicationPaths;
export const ApplicationOptions: ApplicationOptions = applicationOptions;
