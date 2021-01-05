const applicationOptions: ApplicationOptions = {
  Name: 'Wlodzimierz',
};

const applicationPaths: ApplicationPaths = {
  Home: '',
  Signup: 'auth/signup',
};

interface ApplicationOptions {
  readonly Name: string;
}

interface ApplicationPaths {
  readonly Home: string;
  readonly Signup: string;
}

export const ApplicationPaths: ApplicationPaths = applicationPaths;
export const ApplicationOptions: ApplicationOptions = applicationOptions;
