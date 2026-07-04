const studentService = require('../services/student.service');
const teacherService = require('../services/teacher.service');

const resolvers = {
  Query: {
    getStudents: async (_parent, args) => {
      return await studentService.getStudents(args);
    },
    getStudent: async (_parent, { id }) => {
      return await studentService.getStudentById(id);
    },
    searchStudents: async (_parent, { name }) => {
      return await studentService.searchStudents(name);
    },
    activeStudents: async () => {
      return await studentService.getStudents({ isActive: true });
    },
    totalStudents: async () => {
      return await studentService.totalStudents();
    },
    getTeachers: async (_parent, args) => {
      return await teacherService.getTeachers(args);
    },
    getTeacher: async (_parent, { id }) => {
      return await teacherService.getTeacherById(id);
    },
    searchTeachers: async (_parent, { name }) => {
      return await teacherService.searchTeachers(name);
    },
    activeTeachers: async () => {
      return await teacherService.getTeachers({ isActive: true });
    },
    totalTeachers: async () => {
      return await teacherService.totalTeachers();
    },
  },
  Mutation: {
    createStudent: async (_parent, { input }) => {
      return await studentService.createStudent(input);
    },
    updateStudent: async (_parent, { id, input }) => {
      return await studentService.updateStudent(id, input);
    },
    deleteStudent: async (_parent, { id }) => {
      return await studentService.deleteStudent(id);
    },
    activateStudent: async (_parent, { id }) => {
      return await studentService.activateStudent(id);
    },
    deactivateStudent: async (_parent, { id }) => {
      return await studentService.deactivateStudent(id);
    },
    createTeacher: async (_parent, { input }) => {
      return await teacherService.createTeacher(input);
    },
    updateTeacher: async (_parent, { id, input }) => {
      return await teacherService.updateTeacher(id, input);
    },
    deleteTeacher: async (_parent, { id }) => {
      return await teacherService.deleteTeacher(id);
    },
    activateTeacher: async (_parent, { id }) => {
      return await teacherService.activateTeacher(id);
    },
    deactivateTeacher: async (_parent, { id }) => {
      return await teacherService.deactivateTeacher(id);
    },
  },
};

module.exports = resolvers;
