const navigationRoutingConstants: NavigationRoutingConstants = {
  Home: '',
  Apps: 'apps',
  Feedback: 'feedback'
};

interface NavigationRoutingConstants {
  readonly Home: string;
  readonly Apps: string;
  readonly Feedback: string;
}

export const NavigationRoutingConstants: NavigationRoutingConstants = navigationRoutingConstants;
