import * as client from "@prisma/client";

let prisma = new client.PrismaClient();

export async function seedData() {
  await seedAnggota(10);
  await seedAbsensi(40);
}

async function seedAnggota(n: number) {
  while (n--) {
    await prisma.anggota.create({
      data: {
        satker: generateRandomString(5),
        username: generateRandomString(10),
        password: generateRandomString(5),
      }
    })
  }
}

async function seedAbsensi(n: number) {
  let listAnggota = await prisma.anggota.findMany();
  while (n--) {
    await prisma.absen.create({
      data: {
        tanggal: new Date(),
        anggotaId: listAnggota.map(e => e.id)[n % listAnggota.length],
        note: ["WFO", "IZIN", "WFH"][n % 2],
        absenMasuk: {
          create: {
            foto: generateRandomString(5),
            time: new Date(),
            latitude: generateRandomString(10),
            longitude: generateRandomString(10),
          }
        },
        absenPulang: {
          create: {
            foto: generateRandomString(5),
            time: new Date(),
            latitude: generateRandomString(10),
            longitude: generateRandomString(10),
          }
        }
      }
    })
  }
}

function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

seedData().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect();
})
