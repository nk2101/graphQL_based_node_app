const TeacherCreateInput = `
  input CreateTeacherInput {
    firstName: String!
    lastName: String!
    email: String!
    subject: String!
    department: String!
    phone: String
    address: String
    experienceYears: Int
    isActive: Boolean
  }
`;

const TeacherUpdateInput = `
  input UpdateTeacherInput {
    firstName: String
    lastName: String
    email: String
    subject: String
    department: String
    phone: String
    address: String
    experienceYears: Int
    isActive: Boolean
  }
`;

module.exports = {
  TeacherCreateInput,
  TeacherUpdateInput,
};
