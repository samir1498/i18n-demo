import { z, defineCollection } from 'astro:content';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),
      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  schema: z.object({
    author: z.string().optional(),
    category: z.string().optional(),
    draft: z.boolean().optional(),
    excerpt: z.string().optional(),
    image: z.string(),
    metadata: metadataDefinition(),
    publishDate: z.date(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
    updateDate: z.date().optional(),
  }),
});

const contributionCollection = defineCollection({
  schema: z.object({
    siteWeb: z.string().url().optional(),
    github: z.string().url(),
    logo: z.string().optional(),
    title: z.string(),
    description: z.string(),
    type: z.enum(['interne', 'externe', 'internal', 'external']),
  }),
});

export const collections = {
  post: postCollection,
  contribution: contributionCollection,
};
