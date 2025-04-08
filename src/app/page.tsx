// src/app/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const student = await prisma.student.findFirst();

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Bonjour</h1>
      <p className="mb-4">
        Étudiant depuis la base de données :{" "}
        <strong>{student?.name ?? "aucun étudiant trouvé"}</strong>
      </p>
      <Link
        href="/autre-page"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Aller vers l&autre page
      </Link>
    </main>
  );
}
