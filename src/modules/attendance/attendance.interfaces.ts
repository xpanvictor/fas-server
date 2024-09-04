import mongoose, { Model } from 'mongoose';

export interface IAttendance {
  student: mongoose.Schema.Types.ObjectId;
  class: mongoose.Schema.Types.ObjectId;
  timestamp: Date;
}

export interface IAttendanceDoc extends IAttendance, Document {}

export interface IAttendanceModel extends Model<IAttendanceDoc> {}
