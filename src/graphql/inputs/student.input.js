const StudentCreateInput = `
  input CreateStudentInput {
    firstName: String!
    lastName: String!
    email: String!
    age: Int!
    course: String!
    department: String!
    phone: String
    address: String
    isActive: Boolean
  }
`;

const StudentUpdateInput = `
  input UpdateStudentInput {
    firstName: String
    lastName: String
    email: String
    age: Int
    course: String
    department: String
    phone: String
    address: String
    isActive: Boolean
  }
`;

module.exports = {
  StudentCreateInput,
  StudentUpdateInput,
};
