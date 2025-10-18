export const dynamic = 'force-static'
export const revalidate = 180
import type { CollectionConfig, CollectionSlug } from 'payload'

// Import your blocks

// Import utility functions – ensure these files exist and export the corresponding functions.
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugField } from '@/utilities/slugField'
import { MediaBlock } from '@/Blocks/MediaBlock/config'
import NavigationBlock from '@/Blocks/Navigation/config'

export const Pages: CollectionConfig = {
  slug: 'pages',

  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      // For the Next.js App Router, you might want the preview URL to point to your new app route.
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'path',
      type: 'text',
      label: 'Page Path',
      required: true,
      unique: true,
    },
    {
      name: 'metadata',
      type: 'relationship',
      relationTo: 'metadata' as CollectionSlug,
      label: 'meta data',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [MediaBlock, NavigationBlock],
      required: true,
      admin: {
        initCollapsed: true,
      },
    },

    // This assumes slugField returns an array of field definitions.
    ...slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
