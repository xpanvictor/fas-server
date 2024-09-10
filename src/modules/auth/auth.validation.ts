import Joi from 'joi';
import { password } from '../validate/custom.validation';
import { NewRegisteredStudent } from '@/modules/student/student.interfaces';

const registerBody: Record<keyof NewRegisteredStudent, any> & { isStudent?: any } = {
  studentMail: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
  matricNumber: Joi.string().required(),
  isStudent: Joi.boolean().default(true),
};

export const register = {
  body: Joi.object().keys(registerBody),
};

export const login = {
  body: Joi.object().keys({
    studentMail: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

export const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

export const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};
