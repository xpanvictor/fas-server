import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
// import pick from '../utils/pick';
// import { IOptions } from '../paginate/paginate';
import * as lecturerService from './lecturer.service';

// eslint-disable-next-line import/prefer-default-export
export const createLecturer = catchAsync(async (req: Request, res: Response) => {
  const user = await lecturerService.createLecturer(req.body);
  res.status(httpStatus.CREATED).send(user);
});

// export const getUsers = catchAsync(async (req: Request, res: Response) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
//   const result = await studentService.queryStudents(filter, options);
//   res.send(result);
// });
//
export const getLecturer = catchAsync(async (req: Request, res: Response) => {
  const userId = new mongoose.Types.ObjectId(typeof req.params['userId'] === 'string' ? req.params['userId'] : req.user);
  if (userId) {
    const user = await lecturerService.getLecturerById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
  }
});
//
// export const updateUser = catchAsync(async (req: Request, res: Response) => {
//   if (typeof req.params['userId'] === 'string') {
//     const user = await studentService.updateStudentById(new mongoose.Types.ObjectId(req.params['userId']), req.body);
//     res.send(user);
//   }
// });
//
// export const deleteUser = catchAsync(async (req: Request, res: Response) => {
//   if (typeof req.params['userId'] === 'string') {
//     await studentService.deleteStudentById(new mongoose.Types.ObjectId(req.params['userId']));
//     res.status(httpStatus.NO_CONTENT).send();
//   }
// });
