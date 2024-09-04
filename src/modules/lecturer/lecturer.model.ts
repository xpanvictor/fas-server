import mongoose from 'mongoose';
import { ILecturerDoc, ILecturerModel } from '@/modules/lecturer/lecturer.interfaces';

const lecturerSchema = new mongoose.Schema<ILecturerDoc, ILecturerModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

export default Lecturer;
