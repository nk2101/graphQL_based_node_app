const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
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
    subject: {
      type: String,
      required: [true, 'subject is required'],
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
    experienceYears: {
      type: Number,
      default: 0,
      min: [0, 'experienceYears cannot be negative'],
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

teacherSchema.index({ firstName: 'text', lastName: 'text' });
teacherSchema.index({ department: 1, subject: 1, isActive: 1 });

module.exports = mongoose.model('Teacher', teacherSchema);
