import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IStudentDoc, IStudentModel } from './student.interfaces';

const studentSchema = new mongoose.Schema<IStudentDoc, IStudentModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    studentMail: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    matricNumber: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    fingerprintTemplateId: {
      type: String,
      // required: true,
    },
    enrolledCourses: [
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
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The student's email
 * @param {ObjectId} [excludeUserId] - The id of the student to be excluded
 * @returns {Promise<boolean>}
 */
studentSchema.static(
  'isEmailTaken',
  async function (studentMail: string, excludeStudentId: mongoose.ObjectId): Promise<boolean> {
    const user = await this.findOne({ studentMail, _id: { $ne: excludeStudentId } });
    return !!user;
  }
);

/**
 * Check if password matches the student's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
studentSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
});

studentSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const Student = mongoose.model<IStudentDoc, IStudentModel>('Student', studentSchema);

export default Student;
