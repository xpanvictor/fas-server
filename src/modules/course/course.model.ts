import mongoose from 'mongoose';
import { ICourseDoc, ICourseModel } from '@/modules/course/course.interfaces';

const courseSchema = new mongoose.Schema<ICourseDoc, ICourseModel>({
  courseName: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecturer',
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
  ],
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
