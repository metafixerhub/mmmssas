import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function updatePassword() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const newPassword = 'admin';
  const passwordHash = await bcrypt.hash(newPassword, 10);
  
  await prisma.adminUser.update({
    where: { username },
    data: { passwordHash }
  });
  
  console.log(`Password for ${username} updated successfully to 'admin'`);
}

updatePassword()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
