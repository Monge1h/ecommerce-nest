import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UtilsService {
  constructor(private readonly prismaService: PrismaService) {}

  getDefaultStoreValues() {
    return this.prismaService.store.findUnique({
      where: {
        id: 1,
      },
    });
  }

  sortDataByUserPreferences(products, user_preferences: any) {
    const new_products = products.map((product) => {
      product.description = product.descriptions_products[0]['description'];
      product.currency = product.prices_products[0].currency['abbrev'];
      product.price = product.prices_products[0].price;
      delete product.prices_products;
      delete product.descriptions_products;
      return product;
    });
    return new_products;
  }
}
