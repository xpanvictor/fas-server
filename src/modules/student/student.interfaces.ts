import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export interface IStudent {
  name: string;
  studentMail: string;
  matricNumber: string;
  fingerprintTemplateId: string;
  isEmailVerified: boolean;
  enrolledCourses: mongoose.Types.ObjectId[];
  password: string;
}

export interface IStudentDoc extends IStudent, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IStudentModel extends Model<IStudentDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateStudentBody = Partial<IStudent>;

export type NewRegisteredStudent = Omit<IStudent, 'isEmailVerified' | 'fingerprintTemplate' | 'enrolledCourses'>;

export type NewCreatedStudent = Omit<IStudent, 'isEmailVerified' | 'enrolledCourses'>;

export interface IStudentWithTokens {
  user: IStudentDoc;
  tokens: AccessAndRefreshTokens;
}
