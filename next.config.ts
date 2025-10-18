// // next.config.ts
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next' // <-- IMPORTANT: Import NextConfig type

/** @type {NextConfig} */ // <-- Ensure the type is correctly applied here
const nextConfig: NextConfig = {
  // 1. Corrected 'output' property
  // Use the literal type 'standalone'
  output: 'standalone',

  // 2. openNext config to resolve the original build error
  openNext: {
    functions: {
      wrapper: 'lambda-at-edge',
      converter: 'default',
    },
  },

  // Your existing webpack config
  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

// Note: The withPayload wrapper often handles the final type assertion
export default withPayload(nextConfig, { devBundleServerPackages: false })
