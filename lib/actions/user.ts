'use server';
import { db } from '../db';
import { users } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

// Create a new user
export async function createUser(name: string, email: string) {
  try {
    await db.insert(users).values({ name, email });
    return { success: true, message: 'User created successfully' };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'Failed to create user' };
  }
}

// Read all users
export async function getUsers() {
  try {
    const allUsers = await db.select().from(users);
    return { success: true, data: allUsers };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, message: 'Failed to fetch users' };
  }
}

// Update a user
export async function updateUser(id: number, name: string, email: string) {
  try {
    await db.update(users).set({ name, email }).where(eq(users.id, id));
    return { success: true, message: 'User updated successfully' };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, message: 'Failed to update user' };
  }
}

// Delete a user
export async function deleteUser(id: number) {
  try {
    await db.delete(users).where(eq(users.id, id));
    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, message: 'Failed to delete user' };
  }
}