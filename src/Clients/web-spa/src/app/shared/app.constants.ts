const applicationOptions: ApplicationOptions = {
  Name: 'Wlodzimierz',
  JwtToken: 'WlodzimierzJwtToken'
};

const applicationPaths: ApplicationPaths = {
  Home: '',
  Apps: 'apps',
  Feedback: 'feedback'
};

interface ApplicationOptions {
  readonly Name: string;
  readonly JwtToken: string;
}

interface ApplicationPaths {
  readonly Home: string;
  readonly Apps: string;
  readonly Feedback: string;
}

export const ApplicationPaths: ApplicationPaths = applicationPaths;
export const ApplicationOptions: ApplicationOptions = applicationOptions;
