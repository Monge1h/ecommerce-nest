import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.prismaService.products.findMany({
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
