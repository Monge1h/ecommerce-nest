import {
  Injectable,
  CACHE_MANAGER,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
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
  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.products.create({
      data: {
        name: createProductDto.name,
        sku: createProductDto.sku,
        id_category: createProductDto.id_category,
        id_country: createProductDto.id_country,
        international_shipping: createProductDto.international_shipping,
        descriptions_products: {
          createMany: {
            data: [
              {
                id_language: createProductDto.id_language_description_product,
                description: createProductDto.description_product,
              },
            ],
          },
        },
        prices_products: {
          createMany: {
            data: [
              {
                id_currency: createProductDto.id_curency,
                price: createProductDto.price,
              },
            ],
          },
        },
      },
    });
    this.cacheManager.reset();
    return product;
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
    if (!data) throw new NotFoundException('Items Not founds');
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

  async findOne(id: number, userPreferences) {
    const cache_data = await this.cacheManager.get(
      `product${id}${JSON.stringify(userPreferences)}`,
    );
    if (cache_data !== null) {
      return cache_data;
    }
    const data = await this.prismaService.products.findUnique({
      where: { id },
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
    if (!data) throw new NotFoundException('Item Not found');
    const sorted_data = this.utilsService.sortDataByUserPreferences(
      [data],
      userPreferences,
    );
    await this.cacheManager.set(
      `product${id}${JSON.stringify(userPreferences)}`,
      sorted_data[0],
      {
        ttl: 100,
      },
    );
    return sorted_data[0];
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // get the product by id
    const product = await this.prismaService.products.findUnique({
      where: {
        id,
      },
    });

    // check if user owns the bookmark
    if (!product) throw new ForbiddenException('Access to resources denied');

    return this.prismaService.products.update({
      where: {
        id,
      },
      data: {
        ...updateProductDto,
      },
    });
  }

  async remove(id: number) {
    // get the product by id
    const product = await this.prismaService.products.findUnique({
      where: {
        id,
      },
    });

    if (!product) throw new ForbiddenException('Access to resources denied');
    await this.cacheManager.reset();
    await this.prismaService.descriptions_products.deleteMany({
      where: {
        id_product: id,
      },
    });
    await this.prismaService.prices_products.deleteMany({
      where: {
        id_product: id,
      },
    });
    return await this.prismaService.products.delete({
      where: {
        id,
      },
    });
  }
}
