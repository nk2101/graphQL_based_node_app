const { gql } = require('graphql-tag');
const { StudentCreateInput, StudentUpdateInput } = require('./inputs/student.input');
const { TeacherCreateInput, TeacherUpdateInput } = require('./inputs/teacher.input');

const typeDefs = gql`
  ${StudentCreateInput}
  ${StudentUpdateInput}
  ${TeacherCreateInput}
  ${TeacherUpdateInput}

  type Student {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    age: Int!
    course: String!
    department: String!
    phone: String
    address: String
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Teacher {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    subject: String!
    department: String!
    phone: String
    address: String
    experienceYears: Int!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getStudents(page: Int, limit: Int, department: String, course: String, isActive: Boolean, sortBy: String): [Student!]!
    getStudent(id: ID!): Student
    searchStudents(name: String!): [Student!]!
    activeStudents: [Student!]!
    totalStudents: Int!

    getTeachers(page: Int, limit: Int, department: String, subject: String, isActive: Boolean, sortBy: String): [Teacher!]!
    getTeacher(id: ID!): Teacher
    searchTeachers(name: String!): [Teacher!]!
    activeTeachers: [Teacher!]!
    totalTeachers: Int!
  }

  type Mutation {
    createStudent(input: CreateStudentInput!): Student!
    updateStudent(id: ID!, input: UpdateStudentInput!): Student!
    deleteStudent(id: ID!): String!
    activateStudent(id: ID!): Student!
    deactivateStudent(id: ID!): Student!

    createTeacher(input: CreateTeacherInput!): Teacher!
    updateTeacher(id: ID!, input: UpdateTeacherInput!): Teacher!
    deleteTeacher(id: ID!): String!
    activateTeacher(id: ID!): Teacher!
    deactivateTeacher(id: ID!): Teacher!
  }
`;

module.exports = typeDefs;
