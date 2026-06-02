-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPinned" BOOLEAN NOT NULL DEFAULT false;
