import mongoose from 'mongoose';

let isConnected = false;

export async function connectMongo(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return false;
  if (isConnected) return true;

  try {
    await mongoose.connect(uri, { dbName: process.env.MONGODB_DB || 'tuffly' });
    isConnected = true;
    return true;
  } catch (error) {
    console.error('MongoDB connection failed, using JSON fallback:', error);
    return false;
  }
}
