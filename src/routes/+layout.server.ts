import type { RequestEvent } from "./$types";

export function load(ev: RequestEvent){
  let info = null;

  if(!!ev.locals.admin){
    info = {
      username: ev.locals.admin.username,
      profilePict: ev.locals.admin.profilePict
    }
  }

  return {
    info,
  }
}
