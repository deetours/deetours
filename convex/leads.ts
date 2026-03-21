import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getLeads = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("leads").order("desc").collect();
  },
});

export const createLead = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    tripInterest: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("leads", {
      ...args,
      status: "new",
    });
  },
});

export const updateLeadStatus = mutation({
  args: {
    id: v.id("leads"),
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("closed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
