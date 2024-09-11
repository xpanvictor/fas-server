import Joi from 'joi';
import { password, objectId } from '../validate/custom.validation';
import { NewCreatedCourse } from '@/modules/course/course.interfaces';

const createCourseBody: Record<keyof NewCreatedCourse, any> = {
  courseCode: Joi.string().required(),
  courseName: Joi.string().required(),
  lecturer: Joi.string().forbidden(),
};

const registerCourseBody: Record<string, any> = {
  courseCode: Joi.string().required(),
  user: Joi.forbidden(),
};

export const createCourse = {
  body: Joi.object().keys(createCourseBody),
};

export const registerCourse = {
  body: Joi.object().keys(registerCourseBody),
};

export const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getClasses = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId),
  }),
};

export const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

export const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};
