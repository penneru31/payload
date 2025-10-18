import { CollectionConfig } from 'payload'
// ... other imports

const MetaData: CollectionConfig = {
  slug: 'metadata',
  fields: [
    {
      name: 'meta',
      label: 'Meta Information',
      type: 'group', // Using 'group' to logically group these fields
      fields: [
        {
          name: 'metaTitle',
          label: 'Meta Title',
          type: 'text',
        },
        {
          name: 'metaDescription',
          label: 'Meta Description',
          type: 'textarea',
        },
        {
          name: 'metaImage',
          label: 'Meta Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'faviconImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Favicon Image File',
        },
      ],
    },
  ],
}

export default MetaData
