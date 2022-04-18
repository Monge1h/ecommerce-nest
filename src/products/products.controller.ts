import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Response,
  Inject,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Response() res) {
    try {
      const user_preferences = res.locals.user_preferences;
      const data = await this.productsService.findAll(user_preferences);
      this.logger.warn(JSON.stringify(data));
      return res.status(200).json(data);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Response() res) {
    const user_preferences = res.locals.user_preferences;
    const data = await this.productsService.findOne(+id, user_preferences);
    return res.status(200).json(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
