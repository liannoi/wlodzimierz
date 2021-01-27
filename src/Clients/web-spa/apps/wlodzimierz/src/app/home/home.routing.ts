const homeRouting: HomeRouting = {
  Root: '',
  Apps: 'apps',
  Feedback: 'feedback'
};

interface HomeRouting {
  readonly Root: string;
  readonly Apps: string;
  readonly Feedback: string;
}

export const HomeRouting: HomeRouting = homeRouting;
