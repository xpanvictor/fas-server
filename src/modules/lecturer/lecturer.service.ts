import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Lecturer from './lecturer.model';
import ApiError from '../errors/ApiError';
// import { IOptions, QueryResult } from '../paginate/paginate';
import { ILecturerDoc, NewCreatedLecturer, NewRegisteredLecturer } from './lecturer.interfaces';

/**
 * Create a student
 * @param {NewCreatedLecturer} lecturerBody
 * @returns {Promise<ILecturerDoc>}
 */
export const createLecturer = async (lecturerBody: NewCreatedLecturer): Promise<ILecturerDoc> => {
  if (await Lecturer.isEmailTaken(lecturerBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Lecturer.create(lecturerBody);
};

/**
 * Register a student
 * @param {NewRegisteredLecturer} lecturerBody
 * @returns {Promise<ILecturerDoc>}
 */
export const registerLecturer = async (lecturerBody: NewRegisteredLecturer): Promise<ILecturerDoc> => {
  if (await Lecturer.isEmailTaken(lecturerBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Lecturer.create(lecturerBody);
};
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
export const getLecturerById = async (id: mongoose.Types.ObjectId): Promise<ILecturerDoc | null> => Lecturer.findById(id);

// /**
//  * Get student by email
//  * @param {string} email
//  * @returns {Promise<IStudentDoc | null>}
//  */
// export const getStudentByEmail = async (email: string): Promise<IStudentDoc | null> => Student.findOne({ email });
//
// /**
//  * Update student by id
//  * @param {mongoose.Types.ObjectId} userId
//  * @param {UpdateStudentBody} updateBody
//  * @returns {Promise<IStudentDoc | null>}
//  */
// export const updateStudentById = async (
//   userId: mongoose.Types.ObjectId,
//   updateBody: UpdateStudentBody
// ): Promise<IStudentDoc | null> => {
//   const user = await getStudentById(userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
//   }
//   if (updateBody.studentMail && (await Student.isEmailTaken(updateBody.studentMail, userId))) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
//   }
//   Object.assign(user, updateBody);
//   await user.save();
//   return user;
// };
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
