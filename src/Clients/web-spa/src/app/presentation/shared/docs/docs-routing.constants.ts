const docsRoutingConstants: DocsRoutingConstants = {
  Root: 'docs',
  Api: 'docs/api',
  Apps: 'docs/apps',
};

interface DocsRoutingConstants {
  readonly Root: string;
  readonly Api: string;
  readonly Apps: string;
}

export const DocsRoutingConstants: DocsRoutingConstants = docsRoutingConstants;
