import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

// Route for Clerk Webhook
http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Basic handler structure for Clerk Webhook
    // Note: In production you MUST verify the webhook signature using svix
    const payloadString = await request.text();
    const headerPayload = request.headers;

    let evt: any;
    try {
      evt = JSON.parse(payloadString);
    } catch (err) {
      return new Response("Error parsing payload", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name } = evt.data;
      const primaryEmail = email_addresses?.[0]?.email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      // Ensure 'upsertUser' exists in 'users.ts'
      // You can either call an internal mutation or just leave it for now
      // This is a placeholder for the actual mutation to sync the user 
      console.log(`User ${id} updated/created with email ${primaryEmail}`);
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;
      console.log(`User ${id} deleted`);
    }

    return new Response("Webhook received", { status: 200 });
  }),
});

export default http;
