-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_id_category_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_id_country_fkey";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_country_fkey" FOREIGN KEY ("id_country") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
