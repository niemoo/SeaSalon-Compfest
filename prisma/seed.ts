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

  // Seed Admin User
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
      { id: 1, name: 'Haircuts and Styling' },
      { id: 2, name: 'Manicure and Pedicure' },
      { id: 3, name: 'Facial Treatments' },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
