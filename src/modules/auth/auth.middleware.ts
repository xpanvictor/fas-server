import { Request, Response, NextFunction } from 'express';
// import passport from 'passport';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/ApiError';
// import { roleRights } from '../../config/roles';
// import { IStudentDoc } from '@/modules/student/student.interfaces';
// import { ILecturerDoc } from '@/modules/lecturer/lecturer.interfaces';
import config from '@/config/config';

// const verifyCallback =
//   (
//     req: Request,
//     resolve: any,
//     reject: any
//     // requiredRights: string[]
//   ) =>
//   async (err: Error, user: IStudentDoc | ILecturerDoc, info: string) => {
//     console.log(err, info, user);
//     if (err || info || !user) {
//       return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
//     }
//     req.user = user;
//
//     // if (requiredRights.length) {
//     // const userRights = roleRights.get(student.role);
//     // if (!userRights) return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
//     // const hasRequiredRights = requiredRights.every((requiredRight: string) => userRights.includes(requiredRight));
//     // if (!hasRequiredRights && req.params['userId'] !== student.id) {
//     // return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
//     // }
//     // }
//
//     resolve();
//   };

const authMiddleware =
  () =>
  // ...requiredRights: string[]
  async (req: Request, _res: Response, next: NextFunction) =>
    new Promise<void>((resolve, reject) => {
      // use pure jwt
      const authHeader = req.headers.authorization as string;
      const jwtString = authHeader?.replace('Bearer ', '');
      console.log(jwtString, authHeader, req.headers);
      if (!jwtString) reject(new ApiError(httpStatus.UNAUTHORIZED, 'No jwt'));

      req.user = jwt.verify(jwtString, config.jwt.secret).sub;
      resolve();
    })
      .then(() => next())
      .catch((err) => next(err));

export default authMiddleware;
