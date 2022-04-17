import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from '../utils/utils.service';
@Injectable()
export class ProductsService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly prismaService: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(userPreferences) {
    const cache_data = await this.cacheManager.get(
      `allproducts${JSON.stringify(userPreferences)}`,
    );
    if (cache_data !== null) {
      return cache_data;
    }
    const data = await this.prismaService.products.findMany({
      orderBy: [
        {
          international_shipping: 'desc',
        },
      ],
      include: {
        countries: {
          select: {
            name: true,
          },
        },
        descriptions_products: {
          include: {
            language: true,
          },
          where: {
            id_language: userPreferences.id_language,
          },
        },
        prices_products: {
          include: {
            currency: true,
          },
          where: {
            id_currency: userPreferences.id_currency,
          },
        },
      },
    });
    const sorted_data = this.utilsService.sortDataByUserPreferences(
      data,
      userPreferences,
    );
    await this.cacheManager.set(
      `allproducts${JSON.stringify(userPreferences)}`,
      sorted_data,
      {
        ttl: 100,
      },
    );
    return sorted_data;
  }

  findOne(id: number) {
    return this.prismaService.products.findUnique({
      where: { id },
      include: {
        descriptions_products: {
          include: {
            language: true,
          },
        },
        prices_products: {
          include: {
            currency: true,
          },
        },
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
