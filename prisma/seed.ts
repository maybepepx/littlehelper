import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create seed project
  const seedProject = await prisma.project.create({
    data: {
      title: 'Checkout Flow Improvements',
      productType: 'E‑commerce checkout',
      researchGoal: 'Reduce cart abandonment on payment step',
      targetAudience: 'US online shoppers aged 22–45',
      personasCount: 3,
      status: 'DRAFT',
    },
  })

  console.log('Seed project created:', seedProject)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
