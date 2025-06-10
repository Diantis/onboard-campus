/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SignedDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SignedDocument" DROP CONSTRAINT "SignedDocument_documentId_fkey";

-- DropForeignKey
ALTER TABLE "SignedDocument" DROP CONSTRAINT "SignedDocument_studentId_fkey";

-- DropTable
DROP TABLE "Document";

-- DropTable
DROP TABLE "SignedDocument";

-- DropEnum
DROP TYPE "DocumentCategory";

-- CreateTable
CREATE TABLE "FaqQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FaqQuestion_pkey" PRIMARY KEY ("id")
);
