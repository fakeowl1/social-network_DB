/*
  Warnings:

  - You are about to drop the column `user_id` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,currency]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropIndex
DROP INDEX "idx_accounts_user_id";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "user_id",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX "idx_accounts_name_currency" ON "accounts"("name", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "uidx_accounts_name_currency" ON "accounts"("name", "currency");
