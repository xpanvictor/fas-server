import mongoose from 'mongoose';
import { IAttendanceDoc, IAttendanceModel } from '@/modules/attendance/attendance.interfaces';

const attendanceSchema = new mongoose.Schema<IAttendanceDoc, IAttendanceModel>({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
