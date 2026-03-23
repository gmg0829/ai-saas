import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getUsage(userId: string): Promise<number> {
  const key = `usage:${userId}`;
  const count = await redis.get<number>(key);
  return count || 0;
}

export async function incrementUsage(userId: string): Promise<number> {
  const key = `usage:${userId}`;
  const count = await redis.incr(key);
  // Reset at midnight
  await redis.expire(key, 86400);
  return count;
}

export async function checkRateLimit(
  userId: string,
  limit: number = 10
): Promise<boolean> {
  const usage = await getUsage(userId);
  return usage < limit;
}
