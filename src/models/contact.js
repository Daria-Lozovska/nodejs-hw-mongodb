import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: String,
  isFavourite: Boolean,
  contactType: { type: String, required: true },
}, {
  timestamps: true 
});

export default contactSchema;