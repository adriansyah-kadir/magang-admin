import { PUBLIC_COOKIE_NAME } from "$env/static/public"
import { redirect, type ServerLoad } from "@sveltejs/kit"

export const load: ServerLoad = async (ev) => {
  let nextUrl = ev.url.searchParams.get("next")
  ev.cookies.delete(PUBLIC_COOKIE_NAME, {path: "/"});
  return redirect(302, nextUrl ?? '/');
}
