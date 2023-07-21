import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel("next-nest-prisma-starter");
}
