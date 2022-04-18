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
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('Jwt')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Response() res) {
    try {
      const user_preferences = res.locals.user_preferences;
      const data = await this.productsService.findAll(user_preferences);
      this.logger.info(JSON.stringify(data));
      return res.status(200).json(data);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @ApiParam({
    name: 'id',
    description: 'id of product',
    type: 'number',
    required: true,
  })
  @Get(':id')
  async findOne(@Param('id') id: string, @Response() res) {
    const user_preferences = res.locals.user_preferences;
    const data = await this.productsService.findOne(+id, user_preferences);
    return res.status(200).json(data);
  }
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('Jwt')
  @ApiParam({
    name: 'id',
    description: 'id of product',
    type: 'number',
    required: true,
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('Jwt')
  @ApiParam({
    name: 'id',
    description: 'id of product',
    type: 'number',
    required: true,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
