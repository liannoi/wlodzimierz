const docsRouting: DocsRouting = {
  Root: 'docs',
  Api: 'docs/api'
};

interface DocsRouting {
  readonly Root: string;
  readonly Api: string;
}

export const DocsRouting: DocsRouting = docsRouting;
