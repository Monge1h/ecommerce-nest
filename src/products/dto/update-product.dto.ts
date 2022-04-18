export class UpdateProductDto {
  readonly name: string;
  readonly sku: string;
  readonly id_category: number;
  readonly id_country: number;
  readonly international_shipping: boolean;
}
