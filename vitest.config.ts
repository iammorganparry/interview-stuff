import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
        provider: 'istanbul' // or 'c8'
      },
    include: ['**/*.test.ts'],
    // ...
  },
})