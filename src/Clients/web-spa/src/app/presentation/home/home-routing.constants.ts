const homeRoutingConstants: HomeRoutingConstants = {
  Root: '',
  Apps: 'apps',
  Feedback: 'feedback',
};

interface HomeRoutingConstants {
  readonly Root: string;
  readonly Apps: string;
  readonly Feedback: string;
}

export const HomeRoutingConstants: HomeRoutingConstants = homeRoutingConstants;
