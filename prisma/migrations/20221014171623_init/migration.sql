-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "URL" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalURL" TEXT NOT NULL,
    "shortenURL" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "URL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "URL_originalURL_key" ON "URL"("originalURL");

-- CreateIndex
CREATE UNIQUE INDEX "URL_shortenURL_key" ON "URL"("shortenURL");
