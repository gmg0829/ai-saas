import { OpenAI } from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { Redis } from "@upstash/redis";

// Initialize OpenAI
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Pinecone
export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "",
});

// Initialize Redis
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// This function sets up server-only integrations
export function register() {
  // Add any server-only initialization here
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Node.js specific initialization
  }
}
