import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BlockData, RenderBlocks } from '@/Blocks/RenderBlocks'
import Head from 'next/head'

export type PageData = {
  title: string
  slug: string
  layout: BlockData[]
  path: string
  metadata?: {
    meta: {
      metaTitle?: string
      metaDescription?: string
      metaImage?: {
        filename: string
      }
      faviconImage: {
        filename: string
      }
    }
  }
}

export async function getPage(path: string): Promise<PageData | null> {
  const payloadConfig = await config

  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: { path: { equals: path } },
    depth: 2,
  })

  console.log(`[DynamicPageRenderer] Payload find result for path "${path}":`, result)

  const page = result.docs?.[0]

  return page as unknown as PageData
}

export default async function DynamicPageRenderer({ pagePath }: { pagePath: string }) {
  const page = await getPage(pagePath)

  if (!page) {
    console.log(`[DynamicPageRenderer] Page not found for path: "${pagePath}". Calling notFound().`)
    notFound()
  }

  return (
    <>
      {page.layout && <RenderBlocks blocks={page.layout} />}
      {!page.layout &&
        console.warn(`[DynamicPageRenderer] No layout blocks found for page: "${pagePath}"`)}
    </>
  )
}
