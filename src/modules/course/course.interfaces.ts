import mongoose, { Model } from 'mongoose';

export interface ICourse {
  courseName: string;
  courseCode: string;
  lecturer: mongoose.Schema.Types.ObjectId;
  students: mongoose.Schema.Types.ObjectId[];
  classes: mongoose.Schema.Types.ObjectId[];
}

export interface ICourseDoc extends ICourse, Document {
  _id: mongoose.Types.ObjectId;
}

export interface ICourseModel extends Model<ICourseDoc> {}

export type NewCreatedCourse = Omit<ICourse, 'students' | 'classes'>;

export interface ICourseAttendanceAggr {
  id: string;
  name: string;
  attendedClasses: number;
  totalClasses: number;
}
