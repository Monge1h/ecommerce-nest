-- AlterTable
ALTER TABLE "countries" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "countries_id_seq";

-- AlterTable
ALTER TABLE "currency" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "currency_id_seq";
