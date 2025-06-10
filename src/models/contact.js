import mongoose from "mongoose";
import { typeList } from "../constans/index.js";
import { Schema } from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        email: String,
        isFavourite: Boolean,
        contactType: {type: String, required: true, enum: typeList, default: 'personal'},
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
