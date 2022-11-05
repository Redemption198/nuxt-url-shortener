/*
  Warnings:

  - A unique constraint covering the columns `[shortenURL]` on the table `URL` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "URL_originalURL_key";

-- CreateIndex
CREATE UNIQUE INDEX "URL_shortenURL_key" ON "URL"("shortenURL");
