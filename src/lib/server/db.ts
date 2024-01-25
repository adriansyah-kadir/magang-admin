import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createDefaultAdmin(){
  let admin = await prisma.admin.create({
    data: {
      username: "Admin",
      password: "1234"
    }
  })
  return admin
}
