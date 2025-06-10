// prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // 1. Nettoyage des tables (en dev uniquement)
  await prisma.signedDocument.deleteMany();
  await prisma.document.deleteMany();
  await prisma.faqQuestion.deleteMany();
  await prisma.event.deleteMany();
  await prisma.prof.deleteMany();
  await prisma.student.deleteMany();

  // 2. Seed des étudiants
  const [admin, student] = await Promise.all([
    prisma.student.create({
      data: {
        role: "ADMIN",
        name: "Admin User",
        email: "admin@campus.test",
        password: "hashedpassword", // mettez un hash valide
      },
    }),
    prisma.student.create({
      data: {
        role: "STUDENT",
        name: "Alice Étudiante",
        email: "alice@campus.test",
        password: "hashedpassword", // mettez un hash valide
      },
    }),
  ]);

  // 3. Seed des professeurs
  await prisma.prof.createMany({
    data: [
      { name: "Professeur Durand" },
      { name: "Professeur Martin" },
    ],
  });

  // 4. Seed d'événements
  await prisma.event.createMany({
    data: [
      {
        title: "Journée d'accueil",
        description: "Rencontre avec les responsables pédagogiques",
        start: new Date("2025-09-01T09:00:00Z"),
        end: new Date("2025-09-01T17:00:00Z"),
        allDay: false,
        color: "#FF5722",
        location: "Amphithéâtre A",
      },
      {
        title: "Forum des associations",
        description: null,
        start: new Date("2025-09-02T10:00:00Z"),
        end: new Date("2025-09-02T15:00:00Z"),
        allDay: false,
        color: "#4CAF50",
        location: "Hall principal",
      },
    ],
  });

  // 5. Seed des FAQ
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
        answer: null, // en attente de réponse
      },
      {
        question: "Où trouver le plan du campus ?",
        answer: null, // en attente de réponse
      },
    ],
  });

  // 6. Seed des documents
  const docs = await prisma.document.createMany({
    data: [
      {
        name: "Règlement intérieur",
        fileUrl: "/docs/reglement.pdf",
        category: "TO_SIGN",
      },
      {
        name: "Guide de l'étudiant",
        fileUrl: "/docs/guide.pdf",
        category: "GENERAL",
      },
      {
        name: "Plan du campus",
        fileUrl: "/docs/plan.pdf",
        category: "RESOURCE",
      },
    ],
  });

  // 7. Signature d'un document par l'étudiant
  // récupérons l'ID d'un document à signer et l'ID de l'étudiant
  const docToSign = await prisma.document.findFirst({
    where: { category: "TO_SIGN" },
  });
  if (docToSign) {
    await prisma.signedDocument.create({
      data: {
        documentId: docToSign.id,
        studentId: student.id,
        signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...", // exemple de DataURL
      },
    });
  }

  console.log("✅ Base de données seedée avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
