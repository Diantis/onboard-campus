// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.faqQuestion.createMany({
    data: [
      {
        question: "Comment m'inscrire au campus ?",
        answer:
          "Rendez-vous sur la page d'inscription, remplissez le formulaire et confirmez votre e-mail.",
      },
      {
        question: "Quelles sont les dates de la rentrée ?",
        answer: "La rentrée aura lieu le 1er septembre 2025.",
      },
      {
        question: "Puis-je changer de filière après l'inscription ?",
        answer: null,
      },
      {
        question: "Où trouver le plan du campus ?",
        answer: null,
      },
    ],
  });

  console.log("✅ Seed FAQ fait");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
