import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const trackEvent = mutation({
  args: {
    event: v.string(),
    metadata: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("analytics", args);
  },
});
