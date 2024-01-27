import { z } from "zod";
import {isInvalidDate} from "$lib/utils"

const MAX_SIZE = 5 * 100_000

function checkFileSize(files: File[]) {
  return files.every(e => e.size < MAX_SIZE)
}

export const formSchemaAbsen = z.object({
  anggotaId: z.number().default(1),
  tanggal: z.date().default(new Date()),
  note: z.string().min(1),
  attachments: z.instanceof(Array<File>).refine(checkFileSize, "Ukuran File Terlalu Besar Maksimal: " + MAX_SIZE),
})

export type FormSchema = typeof formSchemaAbsen;

export const formSchemaData = z.object({
  satker: z.string().transform(e => e?.length??0 > 0 ? e : undefined),
  note: z.string().transform(e => e?.length??0 > 0 ? e : undefined),
  tanggal: z.string().transform(e => (e ? (isInvalidDate(e) ? new Date() : new Date(e)) : new Date())),
  anggotaId: z.string().transform(e => parseInt(e)).refine(e => !isNaN(e), "value is nan")
})

export type FormSchemaData = typeof formSchemaData;
