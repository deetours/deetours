import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getTrips = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("trips")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();
  },
});

export const getFeaturedTrips = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const trips = await ctx.db
      .query("trips")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();
    
    // If we have a rating field, we could sort by it. For now, just take the first N.
    return args.limit ? trips.slice(0, args.limit) : trips;
  },
});

export const getTripById = query({
  args: { id: v.id("trips") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createTrip = mutation({
  args: {
    title: v.string(),
    destination: v.string(),
    duration: v.string(),
    price: v.number(),
    imageUrl: v.string(),
    category: v.string(),
    description: v.optional(v.string()),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Basic auth check for admin would go here
    return await ctx.db.insert("trips", args);
  },
});

export const updateTrip = mutation({
  args: {
    id: v.id("trips"),
    title: v.optional(v.string()),
    destination: v.optional(v.string()),
    duration: v.optional(v.string()),
    price: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    gallery: v.optional(v.array(v.string())),
    included: v.optional(v.array(v.string())),
    faq: v.optional(
      v.array(
        v.object({
          question: v.string(),
          answer: v.string(),
        })
      )
    ),
    itinerary: v.optional(
      v.array(
        v.object({
          day: v.number(),
          title: v.string(),
          description: v.string(),
          image: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const deleteTrip = mutation({
  args: { id: v.id("trips") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
