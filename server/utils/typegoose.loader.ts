import mongoose from 'mongoose';

export const intializeMongo = async () => {
  try {
    return await mongoose.connect('mongodb://localhost:27017/', {
      dbName: 'test',
    });
  } catch (e) {
    throw new Error('Mongoose Error');
  }
};
