import { mutation } from "./_generated/server";
import { FEATURED_TRIPS } from "../lib/constants";

export const seedTrips = mutation({
  args: {},
  handler: async (ctx) => {
    // Only seed if empty
    const existing = await ctx.db.query("trips").collect();
    if (existing.length > 0) {
      return "Database already seeded";
    }

    for (const trip of FEATURED_TRIPS) {
      // In a real app we'd omit the hardcoded ID and let Convex generate it
      const { id, ...tripData } = trip;
      
      await ctx.db.insert("trips", {
        ...tripData,
        isPublished: true, // Mark all initial trips as published
      });
    }

    return "Successfully seeded trips";
  },
});
