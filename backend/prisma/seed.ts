
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

async function seed() {
  const pw = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@college.edu' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@college.edu',
      password: pw,
      role: 'ADMIN'
    }
  })
  console.log('Seeded admin user (admin@college.edu / admin123)')
}
seed()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
