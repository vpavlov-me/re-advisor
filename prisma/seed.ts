import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Roye Family
  const royeFamily = await prisma.family.upsert({
    where: { email: 'contact@royefamily.com' },
    update: {},
    create: {
      name: 'Roye Family',
      email: 'contact@royefamily.com',
      phone: '+1 (212) 555-0123',
      industry: 'Media & Entertainment',
      location: 'New York, NY',
      description: 'Multi-generational media conglomerate seeking governance restructuring and succession planning.',
      status: 'ACTIVE',
      members: {
        create: [
          { name: 'Logan Roy', role: 'Patriarch', email: 'logan@royemedia.com' },
          { name: 'Kendall Roy', role: 'Eldest Son', email: 'kendall@royemedia.com' },
          { name: 'Siobhan Roy', role: 'Daughter', email: 'shiv@royemedia.com' },
          { name: 'Roman Roy', role: 'Youngest Son', email: 'roman@royemedia.com' },
        ],
      },
      tasks: {
        create: [
          { title: 'Prepare succession proposal', dueDate: new Date('2025-01-25'), priority: 'HIGH', completed: false },
          { title: 'Review constitution draft', dueDate: new Date('2025-01-22'), priority: 'MEDIUM', completed: true },
          { title: 'Schedule quarterly review', dueDate: new Date('2025-01-30'), priority: 'LOW', completed: false },
        ],
      },
      consultations: {
        create: [
          { title: 'Constitution Workshop', date: new Date('2025-01-20T14:00:00'), status: 'SCHEDULED' },
        ],
      }
    },
  })

  // Create Services
  const constitutionService = await prisma.service.upsert({
    where: { name: 'Family Constitution' },
    update: {},
    create: {
      name: 'Family Constitution',
      description: 'Drafting and finalizing the family constitution.',
      price: 8500,
      duration: '3 months',
      status: 'ACTIVE',
    },
  })

  const successionService = await prisma.service.upsert({
    where: { name: 'Succession Planning' },
    update: {},
    create: {
      name: 'Succession Planning',
      description: 'Planning for the next generation of leadership.',
      price: 12000,
      duration: '6 months',
      status: 'ACTIVE',
    },
  })

  // Link Services to Family
  await prisma.familyService.create({
    data: {
      familyId: royeFamily.id,
      serviceId: constitutionService.id,
      status: 'IN_PROGRESS',
      progress: 65,
      startDate: new Date('2024-10-01'),
    },
  })

  await prisma.familyService.create({
    data: {
      familyId: royeFamily.id,
      serviceId: successionService.id,
      status: 'SCHEDULED',
      progress: 0,
      startDate: new Date('2025-02-01'),
    },
  })

  console.log({ royeFamily })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
