const Student = require('../models/student.model');
const mongoose = require('mongoose');

class StudentService {
  formatValidationError(error) {
    if (error.name === 'ValidationError') {
      return Object.values(error.errors).map((item) => item.message).join(', ');
    }

    return error.message;
  }

  async createStudent(input) {
    try {
      const student = new Student(input);
      return await student.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Duplicate email');
      }

      if (error.name === 'ValidationError') {
        throw new Error(this.formatValidationError(error));
      }

      throw new Error('Internal server error');
    }
  }

  async getStudents({ page = 1, limit = 10, department, course, isActive, sortBy } = {}) {
    const query = {};

    if (department) query.department = department;
    if (course) query.course = course;
    if (typeof isActive === 'boolean') query.isActive = isActive;

    const sort = {};
    if (sortBy) {
      const allowedSort = ['firstName', 'age', 'createdAt'];
      if (allowedSort.includes(sortBy)) {
        sort[sortBy] = 1;
      }
    }

    return await Student.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async getStudentById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    const student = await Student.findById(id);
    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  }

  async searchStudents(name) {
    return await Student.find({
      $or: [
        { firstName: { $regex: name, $options: 'i' } },
        { lastName: { $regex: name, $options: 'i' } },
      ],
    }).sort({ firstName: 1 });
  }

  async updateStudent(id, input) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    try {
      const student = await Student.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });

      if (!student) {
        throw new Error('Student not found');
      }

      return student;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Duplicate email');
      }

      if (error.name === 'ValidationError') {
        throw new Error(this.formatValidationError(error));
      }

      throw error;
    }
  }

  async deleteStudent(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      throw new Error('Student not found');
    }

    return 'Student deleted successfully';
  }

  async activateStudent(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    const student = await Student.findByIdAndUpdate(id, { isActive: true }, { new: true, runValidators: true });
    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  }

  async deactivateStudent(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    const student = await Student.findByIdAndUpdate(id, { isActive: false }, { new: true, runValidators: true });
    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  }

  async totalStudents() {
    return await Student.countDocuments();
  }
}

module.exports = new StudentService();
