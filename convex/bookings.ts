import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getBookings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bookings").order("desc").collect();
  },
});

export const createBooking = mutation({
  args: {
    tripId: v.id("trips"),
    leadId: v.optional(v.id("leads")),
    userId: v.optional(v.id("users")),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled")),
    travelDate: v.optional(v.string()),
    groupSize: v.optional(v.number()),
    totalInvestment: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bookings", args);
  },
});

export const updateBookingStatus = mutation({
  args: {
    id: v.id("bookings"),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
