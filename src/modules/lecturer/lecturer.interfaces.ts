import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface ILecturer {
  courses: mongoose.Schema.Types.ObjectId[];
  email: string;
  name: string;
  password: string;
}

export interface ILecturerDoc extends ILecturer, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface ILecturerModel extends Model<ILecturerDoc> {
  isEmailTaken(email: string, excludeLecturerId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type NewRegisteredLecturer = Omit<ILecturer, 'courses'>;

export type NewCreatedLecturer = Omit<ILecturer, 'courses'>;
