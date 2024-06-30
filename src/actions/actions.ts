'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export async function registerUser(formData: FormData) {
  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: formData.get('email') as string,
      },
    });

    if (existingUser) {
      return { success: false, message: 'Email is already used' };
    }

    const hashedPassword = await bcrypt.hash(formData.get('password') as string, 10);

    await prisma.users.create({
      data: {
        id: uuidv4(),
        email: formData.get('email') as string,
        full_name: formData.get('full_name') as string,
        password: hashedPassword,
        phone_number: formData.get('phone_number') as string,
        roleId: 2,
      },
    });

    return { success: true, message: 'Registration Success' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function loginUser(formData: FormData) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: formData.get('email') as string,
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        phone_number: true,
        password: true,
      },
    });

    if (!user) {
      return { success: false, message: 'Email not found' };
    }

    const passwordMatches = await bcrypt.compare(formData.get('password') as string, user.password);

    if (!passwordMatches) {
      return { success: false, message: 'Password is wrong' };
    }

    const { password, ...userWithoutPassword } = user;

    return { success: true, user: userWithoutPassword, message: 'Login Success' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}
