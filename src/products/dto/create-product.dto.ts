export class CreateProductDto {
  readonly name: string;
  readonly sku: string;
  readonly id_category: number;
  readonly id_country: number;
  readonly international_shipping: boolean;
  readonly id_language_description_product: number;
  readonly description_product: string;
  readonly id_curency: number;
  readonly price: number;
}
