const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'firstName is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'lastName is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    age: {
      type: Number,
      required: [true, 'age is required'],
      min: [16, 'age must be greater than 15'],
    },
    course: {
      type: String,
      required: [true, 'course is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'department is required'],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.index({ firstName: 'text', lastName: 'text' });
studentSchema.index({ department: 1, course: 1, isActive: 1 });

module.exports = mongoose.model('Student', studentSchema);
