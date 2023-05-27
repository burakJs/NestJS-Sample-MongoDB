import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDoment = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  imageURL: string;

  @Prop({ type: String, required: true })
  userId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
