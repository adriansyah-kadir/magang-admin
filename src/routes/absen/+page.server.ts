import { fail, type Actions, type RequestEvent } from "@sveltejs/kit";
import { prisma } from "$lib/server/db"
import { superValidate } from "sveltekit-superforms/server";
import { formSchemaAbsen, formSchemaData } from "./schema";
import { saveAttachments } from "@/server/utils";
import { get24HDate } from "@/utils";

export async function load(_: RequestEvent) {
  return {
    formAbsen: await superValidate(formSchemaAbsen),
  }
}

type ActionErrorType = { path: string, message: string }[];

function parseTambahFormData(formData: FormData) {
  let data = {
    anggotaId: parseInt(formData.get("anggota")?.toString() ?? "error"),
    tanggal: new Date(formData.get("tanggal")?.toString() ?? "error"),
    note: formData.get("note"),
    attachments: formData.getAll("attachments"),
  }
  return formSchemaAbsen.safeParse(data)
}

function parseDataFormData(formData: FormData) {
  let data = {
    satker: formData.get("satker")?.toString(),
    note: formData.get("note")?.toString(),
    tanggal: formData.get("tanggal")?.toString(),
    anggotaId: formData.get("anggota")?.toString(),
  }


  let validation = formSchemaData.safeParse(data)
  if (validation.success) {
    console.log("parseDataFormData success", validation.data)
  } else {
    console.log("parseDataFormData error", validation.error)
  }
  return validation
}

async function saveAbsen(data: ReturnType<typeof parseTambahFormData>) {
  let success = false;
  let message = "Gagal"
  let errors: ActionErrorType = []

  if (data.success) {
    try {
      let absen = await prisma.absen.create({
        data: {
          tanggal: data.data.tanggal,
          anggotaId: data.data.anggotaId,
          noteId: data.data.note,
        }
      })
      await saveAttachments(data.data.attachments, absen, "media")
      success = true;
      message = "Sukses"
    } catch (e) {
      errors = [{
        path: "attachments",
        message: String(e)
      }]
    }
  }

  return {
    success,
    message,
    errors,
  }
}

export const actions: Actions = {
  tambah: async ({ request }) => {
    let error: ActionErrorType = [];
    let message = "Success"
    let data = parseTambahFormData(await request.formData())

    if (data.success) {

      let saveAbsenResult = await saveAbsen(data)
      message = saveAbsenResult.message
      error = [...error, ...saveAbsenResult.errors]

      if (!saveAbsenResult.success) return fail(400, {
        tambah: {
          error,
          message
        }
      });

    } else {

      message = data.error.errors.map(e => `${e.path}: ${e.message}`).join(", ")
      error = data.error.errors.map(e => ({
        path: e.path.toString(),
        message: e.message,
      }))

      return fail(400, {
        tambah: {
          error,
          message
        }
      })

    }

    return {
      tambah: {
        error,
        message
      }
    }
  },

  data: async ({ request }) => {
    let data = parseDataFormData(await request.formData())

    let absensi;
    let include = {
      anggota: true,
      absenMasuk: true,
      absenPulang: true,
      attachments: true,
    }
    let dateRange = get24HDate(new Date())

    if (data.success) {
      dateRange = get24HDate(data.data.tanggal)
      absensi = await prisma.absen.findMany({
        where: {
          anggota: {
            satkerId: data.data.satker,
            id: data.data.anggotaId
          },
          tanggal: {
            gte: dateRange.start,
            lt: dateRange.end,
          },
          note: {
            nama: data.data.note
          },
        },
        include,
      })
    }
    absensi = await prisma.absen.findMany({
      where: {
        tanggal: {
          gte: dateRange.start,
          lt: dateRange.end,
        },
      },
      include,
    })
    return {
      data: {
        absensi,
        anggota: await prisma.anggota.findMany(),
        notes: [...await prisma.note.findMany()],
        filter: data.success ? data.data : null
      }
    }
  },
}

