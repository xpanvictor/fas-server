import httpStatus from 'http-status';
// import mongoose from 'mongoose';
import mongoose from 'mongoose';
import ApiError from '../errors/ApiError';
// import { IOptions, QueryResult } from '../paginate/paginate';
import { ICourseDoc, NewCreatedCourse } from './course.interfaces';
import { Course } from '@/modules/course/index';
import { Student } from '@/modules/student';

/**
 * Create a student
 * @param {NewCreatedCourse} courseBody
 * @returns {Promise<ICourseDoc>}
 */
// eslint-disable-next-line import/prefer-default-export
export const createCourse = async (courseBody: NewCreatedCourse): Promise<ICourseDoc> => {
  return Course.create(courseBody);
};

// /**
//  * Register a student
//  * @param {NewRegisteredStudent} userBody
//  * @returns {Promise<IStudentDoc>}
//  */
// export const registerStudent = async (userBody: NewRegisteredStudent): Promise<IStudentDoc> => {
//   if (await Student.isEmailTaken(userBody.studentMail)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
//   return Student.create(userBody);
// };
//
// /**
//  * Query for users
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @returns {Promise<QueryResult>}
//  */
// export const queryStudents = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
//   const users = await Student.paginate(filter, options);
//   return users;
// };
//
// /**
//  * Get student by id
//  * @param {mongoose.Types.ObjectId} id
//  * @returns {Promise<IStudentDoc | null>}
//  */
// export const getStudentById = async (id: mongoose.Types.ObjectId): Promise<IStudentDoc | null> => Student.findById(id);
//
// /**
//  * Get student by email
//  * @param {string} email
//  * @returns {Promise<IStudentDoc | null>}
//  */
export const getCourseByCode = async (courseCode: string): Promise<ICourseDoc | null> => Course.findOne({ courseCode });
//
/**
 * Update student by id
 * @param {mongoose.Types.ObjectId} courseId
 * @param {mongoose.Types.ObjectId} studentId
 * @returns {Promise<IStudentDoc | null>}
 */
export const joinCourseByIds = async (
  courseId: mongoose.Types.ObjectId,
  studentId: mongoose.Types.ObjectId
): Promise<ICourseDoc | null> => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }

  // Register the student for the course
  student.enrolledCourses.push(course._id);
  await student.save();

  // Add the student to the course
  course.students.push(student._id);
  await course.save();

  return course;
};
//
// /**
//  * Delete student by id
//  * @param {mongoose.Types.ObjectId} userId
//  * @returns {Promise<IStudentDoc | null>}
//  */
// export const deleteStudentById = async (userId: mongoose.Types.ObjectId): Promise<IStudentDoc | null> => {
//   const user = await getStudentById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
//   }
//   await user.deleteOne();
//   return user;
// };
