import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const communityMembers = pgTable("community_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(),
  offering: text("offering").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  termsAccepted: boolean("terms_accepted").notNull().default(false),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const insertCommunityMemberSchema = createInsertSchema(communityMembers).omit({
  id: true,
  createdAt: true,
});

export type InsertCommunityMember = z.infer<typeof insertCommunityMemberSchema>;
export type CommunityMember = typeof communityMembers.$inferSelect;
