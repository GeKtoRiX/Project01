import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      match: /^[A-Z][a-z]{3,25}$/,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      match: /^[A-Z][a-z]{3,45}$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (password) => {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,64}$/.test(
            password
          );
        },
        message: 'Invalid password',
      },
    },
    picturePath: {
      type: String,
      default: '',
    },
    friends: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
      trim: true,
      match: /^[A-Z][a-zA-Z-]{3,45}$/,
    },
    occupation: {
      type: String,
      trim: true,
      match: /^[A-Z][a-zA-Z-]{3,45}$/,
    },
    viewedProfile: Number,
    impressions: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);
