import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import mongoose, { Model, Mongoose, ObjectId } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().select('name imageURL userId').exec();
  }

  async findOne(id: string): Promise<Product> {
    let product: Product | PromiseLike<Product>;
    try {
      const convertedId = new mongoose.Types.ObjectId(id);
      product = await this.productModel.findById(convertedId);
    } catch (_) {
      throw new NotFoundException(`Product not fount with id=${id}`);
    }
    if (!product) {
      throw new NotFoundException(`Product not fount with id=${id}`);
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
