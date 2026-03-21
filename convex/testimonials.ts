import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getTestimonials = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").collect();
  },
});

export const createTestimonial = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    content: v.string(),
    tripId: v.optional(v.id("trips")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("testimonials", args);
  },
});

export const deleteTestimonial = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
