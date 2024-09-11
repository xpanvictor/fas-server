import httpStatus from 'http-status';
import { Request, Response } from 'express';
// import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
// import ApiError from '../errors/ApiError';
// import pick from '../utils/pick';
// import { IOptions } from '../paginate/paginate';
import * as courseService from './course.service';
import Attendance from '@/modules/attendance/attendance.model';
import { Course } from '@/modules/course/index';
import Class from '@/modules/class/class.model';
import { ICourseAttendanceAggr } from '@/modules/course/course.interfaces';
import { Student } from '@/modules/student';

export const createCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseCode, courseName } = req.body;
  const lecturer = req.user;
  const course = await courseService.createCourse({
    courseName,
    courseCode,
    lecturer,
  });
  res.status(httpStatus.CREATED).send(course);
});

export const registerCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseCode } = req.body;
  console.log('cor', courseCode);

  const course = await courseService.getCourseByCode(courseCode);
  if (!course) {
    res.status(httpStatus.NOT_FOUND).json({ message: 'Course not found' });
    return;
  }

  const editedCourse = await courseService.joinCourseByIds(course._id, req.user);
  res.status(httpStatus.CREATED).send(editedCourse);
});

export const aggregateStudentCourses = catchAsync(async (req: Request, res: Response) => {
  // Find all courses the student is enrolled in
  const studentId = req.user;
  const studCourse = await Student.findOne({ _id: studentId }).populate('enrolledCourses');
  if (!studCourse) {
    res.status(httpStatus.NOT_FOUND).json({ message: 'Student not found' });
    return;
  }
  const courses = studCourse.enrolledCourses;
  console.log('cm', courses);

  const courseAttendance: ICourseAttendanceAggr[] = [];

  // Iterate over each course

  await Promise.all(
    courses.map(async (course) => {
      // Find all classes for the course
      const courseDetail = await Course.findById(course._id);

      if (!courseDetail) {
        return;
      }

      const classes = await Class.find({ course: course._id });

      // Total classes for the course
      const totalClasses = classes.length;

      // Find attendance records for the student in this course
      const attendances = await Attendance.find({
        student: studentId,
        class: { $in: classes.map((cls) => cls._id) },
      });

      // Calculate attended classes
      const attendedClasses = attendances.length;

      // Create course attendance object
      courseAttendance.push({
        id: course._id as unknown as string,
        name: courseDetail.courseName,
        attendedClasses,
        totalClasses,
      });
    })
  );

  // Send the aggregated result
  res.status(200).json({ courses: courseAttendance });
});

export const aggregateCourseClasses = catchAsync(async (req: Request, res: Response) => {
  const courseId = req.params['courseId'];
  const classes = await Class.find({ course: courseId });

  // Map the classes to the desired interface
  const formattedClasses = await Promise.all(
    classes.map((cls, index) => ({
      id: index + 1, // Incremental ID based on position
      courseId: cls.course, // Course ID from the class
      date: cls.classDate.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
      time: `${cls.startTime.getHours()}:${cls.startTime.getMinutes()}`, // Format time as HH:MM
    }))
  );

  // Send the response with formatted class data
  res.status(200).json({ classes: formattedClasses });
});
