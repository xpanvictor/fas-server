import mongoose, { Model } from 'mongoose';

export interface ILecturer {
  courses: mongoose.Schema.Types.ObjectId[];
  email: string;
  name: string;
}

export interface ILecturerDoc extends ILecturer, Document {}

export interface ILecturerModel extends Model<ILecturerDoc> {}
