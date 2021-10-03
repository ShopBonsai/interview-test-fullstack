import mongoose from 'mongoose';

export const intializeMongo = async (dbName) => {
  try {
    return await mongoose.connect(process.env.MONGO_URL, {
      dbName: dbName,
    });
  } catch (e) {
    throw new Error('Mongoose Error');
  }
};
