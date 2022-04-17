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
      product.country_name = product.countries ? product.countries.name : '';
      product.description =
        product.descriptions_products.length > 0
          ? product.descriptions_products[0]['description']
          : 'No description available';
      product.currency =
        product.prices_products.length > 0
          ? product.prices_products[0].currency['abbrev']
          : 'Unknown';
      product.price =
        product.prices_products.length > 0
          ? product.prices_products[0].price
          : 'Unknown';
      delete product.prices_products;
      delete product.descriptions_products;
      delete product.countries;
      return product;
    });

    let data = new_products;
    if (user_preferences.id_country != null) {
      const country_data = new_products.filter(
        (product) => product.id_country == user_preferences.id_country,
      );
      const not_country_data = new_products.filter(
        (product) => product.id_country !== user_preferences.id_country,
      );
      data = [...country_data, ...not_country_data];
    }
    return data;
  }
}
