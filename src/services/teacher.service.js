const Teacher = require('../models/teacher.model');
const mongoose = require('mongoose');

class TeacherService {
  formatValidationError(error) {
    if (error.name === 'ValidationError') {
      return Object.values(error.errors).map((item) => item.message).join(', ');
    }

    return error.message;
  }

  async createTeacher(input) {
    try {
      const teacher = new Teacher(input);
      return await teacher.save();
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

  async getTeachers({ page = 1, limit = 10, department, subject, isActive, sortBy } = {}) {
    const query = {};

    if (department) query.department = department;
    if (subject) query.subject = subject;
    if (typeof isActive === 'boolean') query.isActive = isActive;

    const sort = {};
    if (sortBy) {
      const allowedSort = ['firstName', 'experienceYears', 'createdAt'];
      if (allowedSort.includes(sortBy)) {
        sort[sortBy] = 1;
      }
    }

    return await Teacher.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async getTeacherById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    const teacher = await Teacher.findById(id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    return teacher;
  }

  async searchTeachers(name) {
    return await Teacher.find({
      $or: [
        { firstName: { $regex: name, $options: 'i' } },
        { lastName: { $regex: name, $options: 'i' } },
      ],
    }).sort({ firstName: 1 });
  }

  async updateTeacher(id, input) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    try {
      const teacher = await Teacher.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });

      if (!teacher) {
        throw new Error('Teacher not found');
      }

      return teacher;
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

  async deleteTeacher(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    return 'Teacher deleted successfully';
  }

  async activateTeacher(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    const teacher = await Teacher.findByIdAndUpdate(id, { isActive: true }, { new: true, runValidators: true });
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    return teacher;
  }

  async deactivateTeacher(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }

    const teacher = await Teacher.findByIdAndUpdate(id, { isActive: false }, { new: true, runValidators: true });
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    return teacher;
  }

  async totalTeachers() {
    return await Teacher.countDocuments();
  }
}

module.exports = new TeacherService();
