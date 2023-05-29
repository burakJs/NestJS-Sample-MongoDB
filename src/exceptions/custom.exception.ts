import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Product not found with ${id}`, HttpStatus.NOT_FOUND);
  }
}
