import mongoose from 'mongoose';

export const connectDB = async (MONGO_URL) => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('ConnectDB...');
  } catch (error) {
    console.error('ConnectDB error: ' + error);
  }
};
