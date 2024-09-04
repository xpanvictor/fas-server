import mongoose, { Model } from 'mongoose';

export interface IClass {
  classCode: string;
  course: mongoose.Schema.Types.ObjectId;
  classDate: Date;
  startTime: Date;
  endTime: Date;
  attendances: mongoose.Schema.Types.ObjectId[];
}

export interface IClassDoc extends IClass, Document {}

export interface IClasssModel extends Model<IClassDoc> {}
