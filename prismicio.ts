import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import config from '@/slicemachine.config.json';

/**
 * The project's Prismic repository name.
 */
export const repositoryName = config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'homepage',
    path: '/',
  },
  {
    type: 'page',
    path: '/:uid',
  },
  {
    type: 'tickets',
    path: '/tickets',
  },
  {
    type: 'tickets_season',
    path: '/tickets/:uid',
  },
  {
    type: 'lessons',
    path: '/lessons',
  },
  {
    type: 'lessons_season',
    path: '/lessons/:uid',
  },
  {
    type: 'lesson',
    resolvers: {
      category: 'category',
    },
    path: '/lessons/:category/:uid',
  },
  {
    type: 'rentals',
    path: '/rentals',
  },
  {
    type: 'rentals_season',
    path: '/rentals/:uid',
  },
  {
    type: 'conditions',
    path: '/conditions',
  },
  {
    type: 'blog',
    path: '/blog',
  },
  {
    type: 'blog_post',
    path: '/blog/:uid',
  },
  {
    type: 'events',
    path: '/events',
  },
  {
    type: 'event',
    path: '/events/:uid',
  },
  {
    type: 'activities',
    path: '/activities',
  },
  {
    type: 'activity',
    path: '/activities/:uid',
  },
  {
    type: 'community',
    path: '/community',
  },
  {
    type: 'press',
    path: '/press',
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { revalidate: 10 } }
        : { next: { revalidate: 5 } },
    ...config,
  });

  // process.env.NODE_ENV === "production"
  // ? { next: { tags: ["prismic"] }, cache: "force-cache" }
  // : { next: { revalidate: 5 } },

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
