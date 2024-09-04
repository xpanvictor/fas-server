import mongoose, { Model } from 'mongoose';

export interface ICourse {
  courseName: string;
  courseCode: string;
  lecturer: mongoose.Schema.Types.ObjectId;
  students: mongoose.Schema.Types.ObjectId[];
  classes: mongoose.Schema.Types.ObjectId[];
}

export interface ICourseDoc extends ICourse, Document {}

export interface ICourseModel extends Model<ICourseDoc> {}
