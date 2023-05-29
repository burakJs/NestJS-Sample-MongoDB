import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { convertMongooseId } from '../util/mongoose-id-util';
import { CustomNotFoundException } from '../exceptions/custom.exception';

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
    const convertedId = convertMongooseId(id);
    const product = await this.productModel.findById(convertedId);
    if (!product) {
      throw new CustomNotFoundException(id);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const convertedId = convertMongooseId(id);
    const foundProduct = this.productModel.findByIdAndUpdate(
      convertedId,
      updateProductDto,
      { new: true },
    );
    if (!foundProduct) {
      throw new CustomNotFoundException(id);
    }

    return foundProduct;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
