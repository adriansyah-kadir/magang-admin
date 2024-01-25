import { prisma, createDefaultAdmin } from "@/server/db"
import { redirect, type Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {

  if (!!!event.locals.admin) {
    console.log("not logged in")
    let admins = await prisma.admin.findMany()
    if (admins.length <= 0) await createDefaultAdmin();
    if (!event.url.pathname.startsWith('/login')) {
      let nextUrl = event.url.pathname
      return redirect(302, `/login?next=${nextUrl}`)
    }
  }

  return resolve(event)
}
