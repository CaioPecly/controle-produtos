import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Body('name') bodyName: string,
    @Body('price') bodyPrice?: number,
    @Body('description') bodyDesc?: string,
    @Body('stock') bodyStock?: number,
    @Query('name') queryName?: string,
    @Query('price') queryPrice?: string,
    @Query('description') queryDesc?: string,
    @Query('stock') queryStock?: string,
  ): Promise<Product> {
    const name = bodyName || queryName;
    const price = bodyPrice ?? (queryPrice ? Number(queryPrice) : undefined);
    const description = bodyDesc || queryDesc;
    const stock = bodyStock ?? (queryStock ? Number(queryStock) : 0);

    if (!name || price === undefined || isNaN(price)) {
      throw new BadRequestException('Os campos "name" e "price" são obrigatórios e válidos.');
    }

    return this.productsService.create({ name, price, description, stock });
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Product>,
    @Query('name') name?: string,
    @Query('price') price?: string,
    @Query('description') description?: string,
    @Query('stock') stock?: string
  ): Promise<Product | null> {
    const updateData: Partial<Product> = {
      name: body.name ?? name,
      price: body.price ?? (price ? Number(price) : undefined),
      description: body.description ?? description,
      stock: body.stock ?? (stock ? Number(stock) : undefined),
    };

    return this.productsService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.delete(id);
  }
}
