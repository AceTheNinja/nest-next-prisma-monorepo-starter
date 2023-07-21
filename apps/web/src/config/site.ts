import { SiteConfig } from "@/types";
import { env } from "@/env.mjs";

export const siteConfig: SiteConfig = {
  name: "nest-next-prisma-starter",
  description:
    "A starter project for NestJS, Next.js, and Prisma with a focus on developer experience and speed of development.",
  url: env.NEXT_PUBLIC_APP_URL,
};