import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { DATABASE_CONNECTION } from './constant';

@Module({
  imports: [MongooseModule.forRoot(DATABASE_CONNECTION), ProductsModule],
})
export class AppModule {}
