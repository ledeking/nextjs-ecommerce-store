import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export async function getCurrentUser() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    return null;
  }

  // Get or create user in database
  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        firstName: clerkUser.firstName || null,
        lastName: clerkUser.lastName || null,
        imageUrl: clerkUser.imageUrl || null,
      },
    });
  } else {
    // Update user info if changed
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        email: clerkUser.emailAddresses[0]?.emailAddress || user.email,
        firstName: clerkUser.firstName || user.firstName,
        lastName: clerkUser.lastName || user.lastName,
        imageUrl: clerkUser.imageUrl || user.imageUrl,
      },
    });
  }

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
