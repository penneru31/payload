// open-next.config.mjs
export default {
  // Output mode for Cloudflare Workers / Pages
  outputMode: 'standalone',

  // Ensures OpenNext finds all required files
  outputFileTracingRoot: process.cwd(),

  // ✅ This section prevents the 'includes' error
  functions: {
    default: {
      memory: 512,
      maxDuration: 10,
      runtime: 'nodejs18.x',
    },
  },
}
