import { db } from '../../db/db';
import { Course, Enrollment, EnrollmentDetails, Student } from './university.types';

export const getStudentsRepository = async (): Promise<Student[]> => {
  const result = await db.query<Student>(
    'SELECT id, name, banner_code AS "bannerCode" FROM students',
  );

  return result.rows;
};

export const getStudentByIdRepository = async (studentId: string): Promise<Student | null> => {
  // @TODO: Complete your code here
  return null;
};

export const getCoursesRepository = async (): Promise<Course[]> => {
  const result = await db.query<Course>('SELECT id, name, credits FROM courses');

  return result.rows;
};

export const getCourseByIdRepository = async (courseId: string): Promise<Course | null> => {
  // @TODO: Complete your code here
  return null;
};

export const getEnrollmentsRepository = async (): Promise<Enrollment[]> => {
  const result = await db.query<Enrollment>(
    `SELECT id, student_id AS "studentId", course_id AS "courseId", is_active AS "isActive"
     FROM student_enrollment`,
  );

  return result.rows;
};

export const getStudentEnrollmentsDetailsRepository = async (studentId: string): Promise<EnrollmentDetails[]> => {
  // @TODO: Complete your code here
  return [];
};

export const getEnrollmentRepository = async (
  studentId: string,
  courseId: string,
): Promise<Enrollment | null> => {
  // @TODO: Complete your code here
  return null;
};

export const enrollStudentRepository = async (
  courseId: string,
  studentId: string,
  isActive: boolean,
): Promise<Enrollment> => {
  if (isActive) {
    const result = await db.query<Enrollment>(
      `INSERT INTO student_enrollment (student_id, course_id, is_active)
       VALUES ($1, $2, true)
       RETURNING id, student_id AS "studentId", course_id AS "courseId", is_active AS "isActive"`,
      [studentId, courseId],
    );

    return result.rows[0];
  }

  const result = await db.query<Enrollment>(
    `UPDATE student_enrollment
     SET is_active = false
     WHERE student_id = $1 AND course_id = $2 AND is_active = true
     RETURNING id, student_id AS "studentId", course_id AS "courseId", is_active AS "isActive"`,
    [studentId, courseId],
  );

  return result.rows[0];
};

export const setStudentEnrollementStatusRepository = async (
  courseId: string,
  studentId: string,
  isActive: boolean,
): Promise<Enrollment> => {
  const result = await db.query<Enrollment>(
    `UPDATE student_enrollment
     SET is_active = $1
     WHERE student_id = $2 AND course_id = $3
     RETURNING id, student_id AS "studentId", course_id AS "courseId", is_active AS "isActive"`,
    [isActive, studentId, courseId],
  );

  return result.rows[0];
};
