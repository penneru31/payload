import React from 'react'
import { use } from 'react'
export const dynamic = 'force-static'

export const revalidate = 180

import DynamicPageRenderer, { getPage } from '@/components/DynamicPageRender'

import type { Metadata, ResolvingMetadata } from 'next'

// Define the shape of the object you get *after* awaiting the params Promise

type ResolvedPageParams = {
  slug?: string[]
}

export async function generateMetadata( // The 'params' argument itself is now a Promise in Next.js 15
  { params }: { params: Promise<{ slug: string[] }> }, // <-- CHANGE HERE: params is now Promise

  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Await the params Promise to get the actual slug object

  const resolvedParams = await params // <-- CHANGE HERE: Await params

  const pathSegments = resolvedParams.slug || [''] // Use resolvedParams

  const currentPath = `/${pathSegments.join('/')}`

  const page = await getPage(currentPath)

  const meta = page?.metadata?.meta

  const metaTitle = meta?.metaTitle || page?.title || 'Default Title'

  const metaDescription = meta?.metaDescription || 'Default description'

  const metaImage = meta?.metaImage

  const faviconImage = meta?.faviconImage

  const openGraphImages = metaImage?.filename ? [{ url: `/media/${metaImage.filename}` }] : []

  const faviconBaseUrl = faviconImage?.filename ? `/media/${faviconImage.filename}` : null

  return {
    title: metaTitle,

    description: metaDescription,

    openGraph: {
      title: metaTitle,

      description: metaDescription,

      images: openGraphImages,
    },

    icons: faviconBaseUrl
      ? [
          { rel: 'icon', url: faviconBaseUrl },

          { rel: 'shortcut icon', url: faviconBaseUrl },

          { rel: 'apple-touch-icon', url: faviconBaseUrl, sizes: '180x180' },

          { rel: 'android-chrome', url: faviconBaseUrl, sizes: '192x192' },
        ]
      : undefined,
  }
}

// type Params = Promise<{ slug: string[] }>

export default async function Page( // The 'params' argument itself is now a Promise in Next.js 15
  { params }: { params: Promise<{ slug: string[] }> }, // <-- CHANGE HERE: params is now Promise
) {
  // Await the params Promise to get the actual slug object

  const { slug } = await params

  const pagePath = slug.length === 0 ? '/' : `/${slug.join('/')}`

  return <DynamicPageRenderer pagePath={pagePath} />
}
