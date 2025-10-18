import type { CheckboxField, TextField } from 'payload'
import { formatSlugHook } from './formatSlug'

type Overrides = {
  slugOverrides?: Partial<TextField>
  checkboxOverrides?: Partial<CheckboxField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { slugOverrides, checkboxOverrides } = overrides

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    ...checkboxOverrides,
  }

  // Default slug field configuration
  const defaultSlugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: 'sidebar',
      components: {
        Field: {
          path: '@/fields/slug/SlugComponent#SlugComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  }

  // Merge the default slug field with any provided overrides.
  const mergedSlugField = {
    ...defaultSlugField,
    ...slugOverrides,
    admin: {
      ...defaultSlugField.admin,
      ...(slugOverrides?.admin || {}),
      components: {
        ...defaultSlugField.admin?.components,
        ...(slugOverrides?.admin?.components || {}),
      },
    },
  } as TextField

  return [mergedSlugField, checkBoxField]
}
