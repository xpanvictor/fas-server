import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { tokenService } from '../token';
import { studentService } from '../student';
import * as authService from './auth.service';
import { emailService } from '../email';
import { lecturerService } from '../lecturer';

export const register = catchAsync(async (req: Request, res: Response) => {
  const { isStudent } = req.body;

  if (isStudent) {
    const user = await studentService.registerStudent(req.body);
    const tokens = await tokenService.generateAuthTokens(user);

    res.status(httpStatus.CREATED).send({ user, tokens });
    return;
  }

  // Lecturer
  const lecturer = await lecturerService.registerLecturer(req.body);
  const tokens = await tokenService.generateAuthTokens(lecturer);
  res.status(httpStatus.CREATED).send({ lecturer, tokens });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { studentMail, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(studentMail, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const userWithTokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...userWithTokens });
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.query['token'], req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

export const sendVerificationEmail = catchAsync(async (req: Request, res: Response) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.studentMail, verifyEmailToken, req.user.name);
  res.status(httpStatus.NO_CONTENT).send();
});

export const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.query['token']);
  res.status(httpStatus.NO_CONTENT).send();
});
