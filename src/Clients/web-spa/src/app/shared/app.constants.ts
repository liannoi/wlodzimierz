const applicationOptions: ApplicationOptions = {
  Name: 'Wlodzimierz'
};

const applicationPaths: ApplicationPaths = {
  Home: '',
  Apps: 'apps',
  Feedback: 'feedback'
};

interface ApplicationOptions {
  readonly Name: string;
}

interface ApplicationPaths {
  readonly Home: string;
  readonly Apps: string;
  readonly Feedback: string;
}

export const ApplicationPaths: ApplicationPaths = applicationPaths;
export const ApplicationOptions: ApplicationOptions = applicationOptions;
