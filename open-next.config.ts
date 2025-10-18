// open-next.config.ts

import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'

export default defineCloudflareConfig({
  // @ts-expect-error: Temporarily unsupported in type definitions
  functions: {
    default: {
      memory: 512,
      maxDuration: 10,
      runtime: 'nodejs18.x',
    },
  },
})
