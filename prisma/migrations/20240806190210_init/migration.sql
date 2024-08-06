-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_clausesAbstainId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_clausesAgainstId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_clausesForId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "type" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_For" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Against" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Abstain" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_For_AB_unique" ON "_For"("A", "B");

-- CreateIndex
CREATE INDEX "_For_B_index" ON "_For"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Against_AB_unique" ON "_Against"("A", "B");

-- CreateIndex
CREATE INDEX "_Against_B_index" ON "_Against"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Abstain_AB_unique" ON "_Abstain"("A", "B");

-- CreateIndex
CREATE INDEX "_Abstain_B_index" ON "_Abstain"("B");

-- AddForeignKey
ALTER TABLE "_For" ADD CONSTRAINT "_For_A_fkey" FOREIGN KEY ("A") REFERENCES "Clauses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_For" ADD CONSTRAINT "_For_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Against" ADD CONSTRAINT "_Against_A_fkey" FOREIGN KEY ("A") REFERENCES "Clauses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Against" ADD CONSTRAINT "_Against_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Abstain" ADD CONSTRAINT "_Abstain_A_fkey" FOREIGN KEY ("A") REFERENCES "Clauses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Abstain" ADD CONSTRAINT "_Abstain_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
