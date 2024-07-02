import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // Seed Roles
  await prisma.roles.createMany({
    data: [
      { id: 1, name: 'admin' },
      { id: 2, name: 'user' },
    ],
    skipDuplicates: true,
  });

  // Seed Admin
  const hashedPassword = await bcrypt.hash('Admin123', 10);

  await prisma.admin.create({
    data: {
      id: uuidv4(),
      full_name: 'Thomas N',
      email: 'thomas.n@compfest.id',
      password: hashedPassword,
      phone_number: '08123456789',
      roleId: 1,
    },
  });

  // Seed Services
  await prisma.services.createMany({
    data: [
      { id: 1, name: 'Haircuts and Styling', durations: 60 },
      { id: 2, name: 'Manicure and Pedicure', durations: 60 },
      { id: 3, name: 'Facial Treatments', durations: 60 },
    ],
    skipDuplicates: true,
  });

  // Seed Users
  const users = [
    { id: uuidv4(), full_name: 'Edi Cahyono', email: 'edi123@gmail.com', phone_number: '081425617894', password: await bcrypt.hash('edi123', 10), roleId: 2 },
    { id: uuidv4(), full_name: 'Joko Widodido', email: 'joko123@gmail.com', phone_number: '081473611494', password: await bcrypt.hash('joko123', 10), roleId: 2 },
    { id: uuidv4(), full_name: 'Jeki Sinajung', email: 'jeki123@gmail.com', phone_number: '081425612345', password: await bcrypt.hash('jeki123', 10), roleId: 2 },
    { id: uuidv4(), full_name: 'Budiono Siregar', email: 'budiono123@gmail.com', phone_number: '081425697641', password: await bcrypt.hash('budiono123', 10), roleId: 2 },
  ];

  for (const user of users) {
    await prisma.users.create({
      data: user,
    });
  }

  // Get user IDs
  const userEdi = await prisma.users.findUnique({ where: { email: 'edi123@gmail.com' } });
  const userJoko = await prisma.users.findUnique({ where: { email: 'joko123@gmail.com' } });
  const userJeki = await prisma.users.findUnique({ where: { email: 'jeki123@gmail.com' } });
  const userBudiono = await prisma.users.findUnique({ where: { email: 'budiono123@gmail.com' } });

  // Seed Reviews
  await prisma.reviews.createMany({
    data: [
      { star_rating: 5, comment: 'Great service!', userId: userEdi?.id ?? '' },
      { star_rating: 4, comment: 'Very satisfied', userId: userJoko?.id ?? '' },
      { star_rating: 3, comment: 'Good', userId: userJeki?.id ?? '' },
      { star_rating: 4, comment: 'Will come back again', userId: userBudiono?.id ?? '' },
    ],
    skipDuplicates: true,
  });

  // Seed Branches
  await prisma.branches.create({
    data: {
      name: 'Sea Salon Head Office',
      location: 'Pulo Gadung, Jakarta Timur',
      opening_time: '07:00',
      closing_time: '21:00',
    },
  });

  await prisma.branchService.createMany({
    data: [
      { branchId: 1, serviceId: 1 },
      { branchId: 1, serviceId: 2 },
      { branchId: 1, serviceId: 3 },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
