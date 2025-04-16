import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Création des utilisateurs
  const users = [
    {
      email: 'admin@campus.fr',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin Campus',
      role: Role.ADMIN,
      address: {
        street: '1 rue de la Paix',
        city: 'Paris',
        zipCode: '75001',
        country: 'France',
        phone: '+33612345678'
      }
    },
    {
      email: 'prof@campus.fr',
      password: await bcrypt.hash('prof123', 10),
      name: 'Jean Dupont',
      role: Role.TEACHER,
      address: {
        street: '15 avenue des Champs-Élysées',
        city: 'Paris',
        zipCode: '75008',
        country: 'France',
        phone: '+33687654321'
      }
    },
    {
      email: 'etudiant@campus.fr',
      password: await bcrypt.hash('etudiant123', 10),
      name: 'Marie Martin',
      role: Role.STUDENT,
      address: {
        street: '25 rue de la République',
        city: 'Lyon',
        zipCode: '69001',
        country: 'France',
        phone: '+33698765432'
      }
    }
  ];

  for (const userData of users) {
    const { address, ...user } = userData;
    const createdUser = await prisma.user.create({
      data: {
        ...user,
        address: {
          create: address
        }
      }
    });
    console.log(`Created user: ${createdUser.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 