/*
  Warnings:

  - You are about to alter the column `date` on the `appointments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `time` on the `appointments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.
  - You are about to alter the column `date` on the `custom_closed_time` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `time` on the `custom_closed_time` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.
  - You are about to alter the column `date` on the `custom_oc` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.
  - You are about to alter the column `day` on the `layout_day` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(9)`.
  - You are about to alter the column `opening` on the `layout_day` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.
  - You are about to alter the column `closing` on the `layout_day` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "date" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "time" SET DATA TYPE VARCHAR(5);

-- AlterTable
ALTER TABLE "custom_closed_time" ALTER COLUMN "date" SET DATA TYPE VARCHAR(45),
ALTER COLUMN "time" SET DATA TYPE VARCHAR(5);

-- AlterTable
ALTER TABLE "custom_oc" ALTER COLUMN "date" SET DATA TYPE VARCHAR(45);

-- AlterTable
ALTER TABLE "layout_day" ALTER COLUMN "day" SET DATA TYPE VARCHAR(9),
ALTER COLUMN "opening" SET DATA TYPE VARCHAR(5),
ALTER COLUMN "closing" SET DATA TYPE VARCHAR(5);
