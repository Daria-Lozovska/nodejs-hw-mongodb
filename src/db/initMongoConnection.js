import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const initMongoConnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://Daria_Lozovska:sl2SP2LuVIbmAKD0@cluster0.xcvyszj.mongodb.net/contacts?retryWrites=true&w=majority&appName=Cluster0");
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error);
    throw error;
  }
};

export default initMongoConnection;

