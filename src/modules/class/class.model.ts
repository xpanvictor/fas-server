import mongoose from 'mongoose';
import { IClassDoc, IClasssModel } from '@/modules/class/class.interfaces';

const classSchema = new mongoose.Schema<IClassDoc, IClasssModel>({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  classDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  classCode: {
    type: String,
    required: true,
    unique: true,
  },
  attendances: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attendance',
    },
  ],
});

const Class = mongoose.model('Class', classSchema);

export default Class;
