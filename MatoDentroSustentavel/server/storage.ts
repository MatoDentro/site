import { communityMembers, type CommunityMember, type InsertCommunityMember } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Storage interface for community members
export interface IStorage {
  getAllMembers(): Promise<CommunityMember[]>;
  getMembersByCategory(category: string): Promise<CommunityMember[]>;
  getMember(id: number): Promise<CommunityMember | undefined>;
  createMember(member: InsertCommunityMember): Promise<CommunityMember>;
}

export class DatabaseStorage implements IStorage {
  async getAllMembers(): Promise<CommunityMember[]> {
    return await db.select().from(communityMembers);
  }

  async getMembersByCategory(category: string): Promise<CommunityMember[]> {
    return await db
      .select()
      .from(communityMembers)
      .where(eq(communityMembers.category, category));
  }

  async getMember(id: number): Promise<CommunityMember | undefined> {
    const [member] = await db
      .select()
      .from(communityMembers)
      .where(eq(communityMembers.id, id));
    
    return member || undefined;
  }

  async createMember(insertMember: InsertCommunityMember): Promise<CommunityMember> {
    const [member] = await db
      .insert(communityMembers)
      .values({ 
        ...insertMember, 
        createdAt: new Date().toISOString()
      })
      .returning();
    
    return member;
  }
}

export const storage = new DatabaseStorage();
