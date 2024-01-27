import type { Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./schema";
import { prisma } from "@/server/db";
import { login } from "$lib/server/utils"

export const actions: Actions = {
  login: async (ev) => {
    let form = await superValidate(ev, formSchema);
    let success = false;

    if (form.valid) {
      let admin = await prisma.admin.findFirst({
        where: {
          username: form.data.username,
          password: form.data.password,
        }
      });
      console.log(form.data.save)
      if (admin != null) {
        let expires = new Date();
        if (form.data.save) {
          expires.setDate(expires.getDate() + 7)
        } else {
          expires.setHours(expires.getHours() + 2)
        }
        success = await login(admin, expires, ev);
      }
    }

    return {
      success,
      form,
    }
  }
}


export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(formSchema)
  };
};
