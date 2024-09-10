import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ILecturerDoc, ILecturerModel } from '@/modules/lecturer/lecturer.interfaces';
import paginate from '../paginate/paginate';
import toJSON from '../toJSON/toJSON';

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
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value: string) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter and one number');
      }
    },
    private: true, // used by the toJSON plugin
  },
});

// add plugin that converts mongoose to json
lecturerSchema.plugin(toJSON);
lecturerSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The student's email
 * @param {ObjectId} [excludeLectuerId] - The id of the student to be excluded
 * @returns {Promise<boolean>}
 */
lecturerSchema.static(
  'isEmailTaken',
  async function (email: string, excludeLecturerId: mongoose.ObjectId): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeLecturerId } });
    return !!user;
  }
);

/**
 * Check if password matches the student's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
lecturerSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
});

lecturerSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

export default Lecturer;
