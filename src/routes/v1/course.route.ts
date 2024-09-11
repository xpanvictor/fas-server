import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { courseController, courseValidation } from '@/modules/course';
import { auth } from '../../modules/auth';

const router: Router = express.Router();

router.route('/').post(auth(), validate(courseValidation.createCourse), courseController.createCourse);
router.route('/register').put(auth(), validate(courseValidation.registerCourse), courseController.registerCourse);
router.route('/aggregate').get(auth(), courseController.aggregateStudentCourses);
router
  .route('/aggregate/classes')
  .get(auth(), validate(courseValidation.getClasses), courseController.aggregateCourseClasses);

router.route('/:courseId').get(auth(), courseController.createCourse);

export default router;
