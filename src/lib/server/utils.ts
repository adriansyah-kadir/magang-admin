import type { Absen, Admin, Attachment } from "@prisma/client";
import type { RequestEvent } from "@sveltejs/kit";
import { prisma } from "./db"
import { PUBLIC_COOKIE_NAME } from "$env/static/public";
import { writeFile, writeFileSync } from "fs";
import { randomUUID } from "crypto";

export async function login(admin: Admin, expires: Date, event: RequestEvent): Promise<boolean> {
  try {
    await prisma.session.deleteMany({
      where: {
        admin: admin
      }
    });

    let session = await prisma.session.create({ data: { adminId: admin.id } });

    event.cookies.set(PUBLIC_COOKIE_NAME, session.id, {
      path: "/",
      expires,
    });

    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function loadAdminFromCookie(ev: RequestEvent): Promise<Admin | null> {
  let sessionId = ev.cookies.get(PUBLIC_COOKIE_NAME);
  if (!!!sessionId) return null;

  let admin = await prisma.admin.findFirst({ where: { session: { id: sessionId } } });
  if (!!!admin) {
    await prisma.session.deleteMany({
      where: {
        id: sessionId
      }
    });
    return null
  };

  console.log("logged in from cookies")
  return admin;
}

export async function saveAttachments(files: Array<File>, absen: Absen, folder: string | null = null) {
  let attachments: Attachment[] = [];
  for (let file of files) {
    let url = `./static/${folder ?? "media"}/${randomUUID()}`
    writeFileSync(url, await file.text());
    attachments.push(
      await prisma.attachment.create({
        data: {
          url: `${url}`,
          name: file.name,
          absenId: absen.id,
        }
      })
    )
  }
  return attachments
}
