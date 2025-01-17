'use server';

import Review from '@/components/layout/Review';
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

export async function loginAuth(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const admin = await prisma.admin.findUnique({
      where: { email },
      select: {
        id: true,
        full_name: true,
        email: true,
        phone_number: true,
        password: true,
        roleId: true,
      },
    });

    if (admin) {
      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (passwordMatches) {
        const { password, ...adminWithoutPassword } = admin;
        return { success: true, role: adminWithoutPassword.roleId, admin: adminWithoutPassword, message: 'Login Success as Admin' };
      } else {
        return { success: false, message: 'Password is wrong' };
      }
    }

    const user = await prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        full_name: true,
        email: true,
        phone_number: true,
        password: true,
        roleId: true,
      },
    });

    if (!user) {
      return { success: false, message: 'Email not found' };
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return { success: false, message: 'Password is wrong' };
    }

    const { password: userPassword, ...userWithoutPassword } = user;
    return { success: true, role: userWithoutPassword.roleId, user: userWithoutPassword, message: 'Login Success as User' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function createNewReservation({ name, phone_number, date, time, userId, serviceId, branchId }: { name: string; phone_number: string; date: Date; time: string; userId: string; serviceId: number; branchId: number }) {
  try {
    const response = await prisma.reservations.create({
      data: {
        name,
        phone_number,
        date,
        time,
        userId,
        serviceId,
        branchId,
      },
    });

    return { success: true, data: response, message: 'Reservation created successfully' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function addNewBranch({ name, location, opening_time, closing_time }: { name: string; location: string; opening_time: string; closing_time: string }) {
  try {
    const response = await prisma.branches.create({
      data: {
        name,
        location,
        opening_time,
        closing_time,
      },
    });

    return { success: true, data: response, message: 'New branch successfully created' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function addReview({ star_rating, comment, userId }: { star_rating: number; comment: string; userId: string }) {
  try {
    const existingReview = await prisma.reviews.findUnique({
      where: {
        userId,
      },
    });

    if (existingReview) {
      const updatedReview = await prisma.reviews.update({
        where: { userId },
        data: {
          star_rating,
          comment,
        },
      });

      return { success: true, data: updatedReview, message: `Successfully updated review for user: ${userId}` };
    } else {
      const newReview = await prisma.reviews.create({
        data: {
          star_rating,
          comment,
          userId,
        },
      });

      return { success: true, data: newReview, message: `Successfully created review for user: ${userId}` };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function getAllReview() {
  try {
    const reviews = await prisma.reviews.findMany({
      include: {
        user: {
          select: {
            full_name: true, // Pastikan field fullname ada di tabel Users
          },
        },
      },
    });

    const formattedReviews = reviews.map((review) => ({
      id: review.id,
      star_rating: review.star_rating,
      comment: review.comment,
      user_fullname: review.user.full_name,
    }));

    return { success: true, data: formattedReviews, message: 'Successfully get all review data' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function getReviewByUserId(userId: string) {
  try {
    const review = await prisma.reviews.findUnique({
      where: {
        userId: userId,
      },
    });
    return { success: true, data: review };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function addNewService({ name, durations }: { name: string; durations: number }) {
  try {
    const response = await prisma.services.create({
      data: {
        name,
        durations,
      },
    });

    return { success: true, data: response, message: 'New service successfully created' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function getAllBranches() {
  try {
    const response = await prisma.branches.findMany();
    return { success: true, data: response, message: 'Successfully get all branches data' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function getAllServices() {
  try {
    const response = await prisma.services.findMany();
    return { success: true, data: response, message: 'Successfully get all services data' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function getAllUsers() {
  try {
    const response = await prisma.users.findMany({
      select: {
        id: true,
        full_name: true,
        email: true,
        phone_number: true,
      },
    });

    return { success: true, data: response, message: 'Successfully get all users data' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function addServiceToBranch({ branchId, serviceId }: { branchId: number; serviceId: number }) {
  try {
    const response = await prisma.branchService.create({
      data: {
        branchId,
        serviceId,
      },
    });
    return { success: true, data: response, message: 'Service added to branch successfully' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function getBranchesWithServicesDashboard() {
  try {
    const branches = await prisma.branches.findMany({
      include: {
        BranchService: {
          include: {
            service: true,
          },
        },
      },
    });

    const transformedBranches = branches.map((branch) => ({
      id: branch.id,
      name: branch.name,
      location: branch.location,
      opening_time: branch.opening_time,
      closing_time: branch.closing_time,
      services: branch.BranchService.map((bs) => bs.service.name),
    }));

    return { success: true, data: transformedBranches, message: 'Successfully fetched branches with services' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function getBranchesWithServicesApp() {
  try {
    const branches = await prisma.branches.findMany({
      include: {
        BranchService: {
          include: {
            service: true,
          },
        },
      },
    });

    const transformedBranches = branches.map((branch) => ({
      id: branch.id,
      name: branch.name,
      location: branch.location,
      opening_time: branch.opening_time,
      closing_time: branch.closing_time,
      services: branch.BranchService.map((bs) => ({
        id: bs.service.id,
        name: bs.service.name,
      })),
    }));

    return { success: true, data: transformedBranches, message: 'Successfully fetched branches with services' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function getAllReservationHistory() {
  try {
    const reservations = await prisma.reservations.findMany({
      include: {
        branches: true,
        services: true,
      },
    });

    const transformedReservations = reservations.map((reservation) => ({
      id: reservation.id,
      branchName: reservation.branches?.name ?? 'Unknown Name',
      branchLocation: reservation.branches?.location ?? 'Unknown Location',
      serviceName: reservation.services?.name ?? 'Unknown Service',
      date: reservation.date.toISOString().split('T')[0],
      time: reservation.time,
    }));

    return { success: true, data: transformedReservations, message: 'Successfully fetched reservation history' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function getReservationHistory(userId: string) {
  try {
    const reservations = await prisma.reservations.findMany({
      where: { userId },
      include: {
        branches: true,
        services: true,
      },
    });

    const transformedReservations = reservations.map((reservation) => ({
      id: reservation.id,
      branchName: reservation.branches?.name ?? 'Unknown Name',
      branchLocation: reservation.branches?.location ?? 'Unknown Location',
      serviceName: reservation.services?.name ?? 'Unknown Service',
      date: reservation.date.toISOString().split('T')[0], // format date to YYYY-MM-DD
      time: reservation.time,
    }));

    return { success: true, data: transformedReservations, message: 'Successfully fetched reservation history' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function updateBranch({ id, name, location, opening_time, closing_time }: { id: number; name: string; location: string; opening_time: string; closing_time: string }) {
  try {
    const response = await prisma.branches.update({
      where: { id },
      data: {
        name,
        location,
        opening_time,
        closing_time,
      },
    });

    return { success: true, data: response, message: 'Branch updated successfully' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function updateUser({ id, full_name, email, phone_number, password }: { id: string; full_name: string; email: string; phone_number: string; password: string }) {
  try {
    const response = await prisma.users.update({
      where: { id },
      data: {
        full_name,
        email,
        phone_number,
        ...(password && { password }),
      },
    });

    return { success: true, data: response, message: 'User updated successfully' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function deleteBranch(id: number) {
  try {
    // Hapus data dari branchService yang terkait dengan branchId
    await prisma.branchService.deleteMany({
      where: { branchId: id },
    });

    // Hapus data dari branches setelah branchService dihapus
    await prisma.branches.delete({
      where: { id },
    });

    return { success: true, message: 'Branch deleted successfully' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function deleteReservation(id: number) {
  try {
    await prisma.reservations.delete({
      where: { id },
    });

    return { success: true, message: 'Reservation deleted successfully' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.users.delete({
      where: { id },
    });

    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: 'An unknown error occurred' };
    }
  }
}
