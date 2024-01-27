import { prisma, createDefaultAdmin } from "@/server/db"
import { redirect, type Handle } from "@sveltejs/kit"
import { loadAdminFromCookie } from "@/server/utils";

export const handle: Handle = async ({ event, resolve }) => {

  if (!!!event.locals.admin) {
    let admin = await loadAdminFromCookie(event);

    if (admin == null) {
      let admins = await prisma.admin.findMany()
      if (admins.length <= 0) await createDefaultAdmin();
      if (!event.url.pathname.startsWith('/login')) {
        let nextUrl = event.url.pathname
        return redirect(302, `/login?next=${nextUrl}`)
      }
    }else{
      event.locals.admin = admin;
    }
  }

  return resolve(event)
}
