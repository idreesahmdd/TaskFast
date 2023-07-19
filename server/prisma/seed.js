const prisma = require("../src/helpers/prisma");
const bcrypt = require("bcrypt");

async function main() {
  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      password: await bcrypt.hash("alice", 10),
      todos: {
        create: [
          {
            title: "Makan Siang",
            description: "Nasi Padang lauk ayam gulai dan es teh manis",
            dueDate: "2024-07-12"
          },
          {
            title: "Tidur Siang",
            description: "Istirahat sebentar 30 menit sampai 60 menit",
            dueDate: "2024-07-12",
            dueTime: "13:30:00"
          }
        ]
      }
    }
  });

  await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      password: await bcrypt.hash("bob", 10)
    }
  });

  await prisma.user.upsert({
    where: { email: "asep@mail.com" },
    update: {},
    create: {
      email: "asep@mail.com",
      name: "Asep",
      password: await bcrypt.hash("asep", 10),
      todos: {
        create: [
          {
            title: "Main Game",
            description: "Mobile Legend 5 game dan Valorant 10 game"
          },
          {
            title: "Mandi Sore",
            description: "",
            dueDate: "2023-07-25"
          },
          {
            title: "Belajar",
            description: "React 30 menit dan baca buku 30 menit"
          }
        ]
      }
    }
  });

  await prisma.user.upsert({
    where: { email: "jajang@mail.com" },
    update: {},
    create: {
      email: "jajang@mail.com",
      name: "Jajang",
      password: await bcrypt.hash("jajang", 10),
      todos: {
        create: [
          {
            title: "Olahraga",
            description: "Pushup 50x , Sit up 20x , dan lari 50km",
            dueDate: "2023-07-26",
            dueTime: "06:00:00"
          },
          {
            title: "Membersihkan kamar",
            description: "Sapu, Pel dan mengganti sprei bantal dan kasur",
            dueDate: "2023-07-26",
            dueTime: "08:00:00"
          },
          {
            title: "Belajar",
            description: "React 30 menit dan baca buku 30 menit"
          }
        ]
      }
    }
  });

  await prisma.user.upsert({
    where: { email: "test@mail.com" },
    update: {},
    create: {
      email: "testing@mail.com",
      name: "Testing",
      password: await bcrypt.hash("testing", 10),
      todos: {
        create: [
          {
            title: "Mandi",
            dueTime: "06:00:00"
          },
          {
            title: "Membersihkan kamar",
            description: "Sapu, Pel dan mengganti sprei bantal dan kasur"
          },
          {
            title: "Belajar",
            description: "Express dan HTML CSS 1 jam"
          },
          {
            title: "Cuci Pakaian",
            description: "Cuci pakaian di ember warna hijau.",
            dueTime: "13:24:00"
          }
        ]
      }
    }
  });

  await prisma.user.upsert({
    where: { email: "admin@mail.com" },
    update: {},
    create: {
      email: "admin@mail.com",
      name: "Admin",
      password: await bcrypt.hash("admin", 10)
    }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
