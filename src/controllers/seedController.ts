import { Elysia } from 'elysia'
import { $ } from 'bun'

export const seedController = new Elysia()
  .post('/seed', async () => {
    try {
      console.log('🌱 Starting database seed via API...')

      // Run the seed script
      const result = await $`bun run prisma/seed.ts`.text()

      console.log('✅ Seed completed successfully')

      return {
        success: true,
        message: 'Database seeded successfully',
        output: result
      }
    } catch (error) {
      console.error('❌ Seed failed:', error)

      return {
        success: false,
        message: 'Failed to seed database',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }, {
    tags: ['database'],
    detail: {
      summary: 'Seed database',
      description: 'Run Prisma seed to populate database with test data'
    }
  })