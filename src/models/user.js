import {model, Schema} from "mongoose";
import {handleServerError, setUpdateSettings} from "../middlewares/hooks.js";
import {emailRegex} from "../constans/index.js";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegex,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true,
})

userSchema.post('save', handleServerError);
userSchema.pre('findOneAndUpdate', setUpdateSettings)
userSchema.post('findOneAndUpdate', handleServerError);

const UserCollection = model('user', userSchema);

export default UserCollection;