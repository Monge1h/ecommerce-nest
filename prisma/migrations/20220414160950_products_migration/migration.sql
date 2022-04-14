-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "sku" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_country" INTEGER NOT NULL,
    "international_shipping" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descriptions_products" (
    "id" SERIAL NOT NULL,
    "id_product" INTEGER NOT NULL,
    "id_language" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "descriptions_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices_products" (
    "id" SERIAL NOT NULL,
    "id_product" INTEGER,
    "id_currency" INTEGER NOT NULL,
    "price" DECIMAL(10,2),

    CONSTRAINT "prices_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "email" VARCHAR(100) NOT NULL,
    "id_default_currency" INTEGER NOT NULL,
    "id_default_language" INTEGER NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "description" VARCHAR(200),
    "picture" VARCHAR(100),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "country_code" VARCHAR(45),
    "id_currency" INTEGER NOT NULL,
    "id_language" INTEGER NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currency" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "abbrev" VARCHAR(100),

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "fk_products_countries" ON "products"("id_country");

-- CreateIndex
CREATE INDEX "fk_products_categories" ON "products"("id_category");

-- CreateIndex
CREATE INDEX "fk_descriptions_products" ON "descriptions_products"("id_product");

-- CreateIndex
CREATE INDEX "fk_language_products" ON "descriptions_products"("id_language");

-- CreateIndex
CREATE INDEX "fk_prices_products" ON "prices_products"("id_product");

-- CreateIndex
CREATE INDEX "fk_currency_products" ON "prices_products"("id_currency");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_country_fkey" FOREIGN KEY ("id_country") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descriptions_products" ADD CONSTRAINT "descriptions_products_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "descriptions_products" ADD CONSTRAINT "descriptions_products_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices_products" ADD CONSTRAINT "prices_products_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices_products" ADD CONSTRAINT "prices_products_id_currency_fkey" FOREIGN KEY ("id_currency") REFERENCES "currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_id_default_language_fkey" FOREIGN KEY ("id_default_language") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_id_default_currency_fkey" FOREIGN KEY ("id_default_currency") REFERENCES "currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_id_language_fkey" FOREIGN KEY ("id_language") REFERENCES "language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_id_currency_fkey" FOREIGN KEY ("id_currency") REFERENCES "currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
