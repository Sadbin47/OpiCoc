import { db } from "@/db/client";
import { UserEntity } from "@/db/schema";
import { UserProfile } from "@/types";

/**
 * Maps database UserEntity to public UserProfile
 */
function toUserProfile(entity: UserEntity): UserProfile {
  return {
    id: entity.id,
    firstName: entity.firstName,
    lastName: entity.lastName,
    email: entity.email,
    role: entity.role.toLowerCase() as "user" | "admin",
    isVerified: entity.isVerified,
    avatarUrl: entity.avatarUrl,
  };
}

export const userService = {
  /**
   * Fetch user by ID
   */
  async getUserById(id: string): Promise<UserProfile | null> {
    const user = await db.getUserById(id);
    return user ? toUserProfile(user) : null;
  },

  /**
   * Fetch user by email
   */
  async getUserByEmail(email: string): Promise<UserProfile | null> {
    const user = await db.getUserByEmail(email);
    return user ? toUserProfile(user) : null;
  },

  /**
   * Update profile details
   */
  async updateProfile(
    userId: string,
    updates: { firstName?: string; lastName?: string; avatarUrl?: string }
  ): Promise<UserProfile | null> {
    const updated = await db.updateUser(userId, updates);
    return updated ? toUserProfile(updated) : null;
  },

  /**
   * Change user password
   */
  async changePassword(
    userId: string,
    _currentPassword: string,
    newPasswordHash: string
  ): Promise<{ success: boolean; message: string }> {
    const user = await db.getUserById(userId);
    if (!user) {
      return { success: false, message: "User account not found." };
    }

    await db.updateUser(userId, { passwordHash: newPasswordHash });
    return { success: true, message: "Password updated successfully." };
  },

  /**
   * Update user role
   */
  async updateUserRole(
    userId: string,
    role: "USER" | "ADMIN"
  ): Promise<{ success: boolean; message: string }> {
    const user = await db.getUserById(userId);
    if (!user) {
      return { success: false, message: "User account not found." };
    }

    await db.updateUser(userId, { role });
    return { success: true, message: `Role updated to ${role}.` };
  },
};
