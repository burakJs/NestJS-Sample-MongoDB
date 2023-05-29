import { NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

export const convertMongooseId = (id: string) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    throw new NotFoundException(`${id} can not cast to ObjectId`);
  }
};
