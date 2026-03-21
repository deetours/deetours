import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("customer")),
  }).index("by_clerkId", ["clerkId"]),

  trips: defineTable({
    title: v.string(),
    destination: v.string(),
    duration: v.string(),
    price: v.number(),
    imageUrl: v.string(),
    category: v.string(),
    rating: v.optional(v.number()),
    reviewsCount: v.optional(v.number()),
    description: v.optional(v.string()),
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
    isPublished: v.boolean(),
  }),

  leads: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    tripInterest: v.string(),
    message: v.optional(v.string()),
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("closed")),
  }),

  bookings: defineTable({
    leadId: v.optional(v.id("leads")), // Can be an upgraded lead
    userId: v.optional(v.id("users")), // If authenticated
    tripId: v.id("trips"),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled")),
    travelDate: v.optional(v.string()),
    groupSize: v.optional(v.number()),
    totalInvestment: v.number(),
    notes: v.optional(v.string()),
  }).index("by_trip", ["tripId"]),

  testimonials: defineTable({
    name: v.string(),
    role: v.string(),
    content: v.string(),
    tripId: v.optional(v.id("trips")),
  }),

  analytics: defineTable({
    event: v.string(),
    metadata: v.any(),
  }),
});
