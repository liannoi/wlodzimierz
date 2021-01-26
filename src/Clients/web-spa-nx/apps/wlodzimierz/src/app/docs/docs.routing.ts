const docsRouting: DocsRouting = {
  Root: 'docs',
  Api: 'docs/endpoints'
};

interface DocsRouting {
  readonly Root: string;
  readonly Api: string;
}

export const DocsRouting: DocsRouting = docsRouting;
