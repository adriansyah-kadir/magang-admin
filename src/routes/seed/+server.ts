import { type RequestHandler, redirect } from "@sveltejs/kit";
import { seedData } from "@/server/seed";

export const GET: RequestHandler = async (ev) => {
  await seedData()
  throw redirect(302, '/')
}
