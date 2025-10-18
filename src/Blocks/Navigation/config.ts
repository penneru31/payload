// src/blocks/NavigationBlock.ts
import type { Block } from 'payload'

const NavigationBlock: Block = {
  slug: 'navigation',
  labels: {
    singular: 'Navigation',
    plural: 'Navigation Blocks',
  },
  fields: [
    // Theme selector for the navigation block
    {
      name: 'theme',
      type: 'select',
      required: true,
      label: 'Navigation Theme',
      options: [
        { label: 'Black Theme', value: 'black-theme' },
        { label: 'White Theme', value: 'white-theme' },
        { label: 'Orange Theme', value: 'orange-theme' },
        { label: 'Green Theme', value: 'green-theme' },
      ],
      defaultValue: 'orange-theme',
    },
    {
      name: 'logo',
      type: 'group',
      label: 'Logo',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Adjust if your media collection has a different slug
          required: true,
          label: 'Logo Image',
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          label: 'Alternative Text',
        },
      ],
    },
    // Array of navigation links
    {
      name: 'links',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Link Text',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Link URL',
        },
      ],
    },
    // Array of buttons (e.g., call-to-action buttons)
    {
      name: 'buttons',
      type: 'array',
      label: 'Navigation Buttons',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Button Text',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Button URL',
        },
        {
          name: 'style',
          type: 'select',
          required: true,
          label: 'Button Style',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}

export default NavigationBlock
