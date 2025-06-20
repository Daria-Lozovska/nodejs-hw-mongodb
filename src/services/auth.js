import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import UserCollection from "../models/user.js";
import createHttpError from "http-errors";
import { randomBytes } from 'crypto';
import SessionCollection from "../models/session.js";
import { accessTokenLifeTime, refreshTokenLifeTime } from "../constants/index.js";
import { sendEmail } from "../filters/sendEmail.js";
import { getEnvVariable } from "../filters/getEnvVariable.js";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const verifyEmailTemplate = path.join(__dirname, '../temp/verify.html');

const templateSource = fs.readFileSync(verifyEmailTemplate, 'utf-8');

const domain = getEnvVariable('APP_DOMAIN');
const jwtSecret = getEnvVariable('JWT_SECRET_KEY');

export const findSession = query => SessionCollection.findOne(query);

export const findUser = query => UserCollection.findOne(query);

const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    const accessTokenValidUntil = Date.now() + accessTokenLifeTime;
    const refreshTokenValidUntil = Date.now() + refreshTokenLifeTime;

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil,
    }
}

export const registerUser = async payload => {
    const { email, password } = payload;

    const user = await findUser({ email });

    if (user) {
        throw createHttpError(409, `Email in use`);
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await UserCollection.create({ ...payload, password: hashPassword });

    try {
        const templateHandlebars = Handlebars.compile(templateSource);
        const token = jwt.sign({ email }, jwtSecret, { expiresIn: '5min' });
        const html = templateHandlebars({
            resetPasswordLink: `${domain}/auth/verification?token=${token}`,
            text: 'Click To reset your password'
        });

        const verifyEmail = {
            to: email,
            subject: 'Verify your email',
            html,
        };

        await sendEmail(verifyEmail);
    } catch (error) {
        console.error('Error while sending verification email:', error);
        throw createHttpError(500, 'Verification email could not be sent.');
    }

    return newUser;
};

export const loginUser = async (payload) => {
    const { email, password } = payload;

    const user = await findUser({ email });

    if (!user) {
        throw createHttpError(401, `Email or password invalid`);
    }

    // if (!user.verify) {
    //     throw createHttpError(401, `User verification failed`);
    // }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw createHttpError(401, `Email or password invalid`);
    }

    await SessionCollection.findOneAndDelete({ userId: user._id });

    const session = createSession();

    return SessionCollection.create({
        userId: user._id,
        ...session,
    });
}

export const refreshToken = async ({ refreshToken, sessionId }) => {
    const session = await findSession({ refreshToken, _id: sessionId });

    if (!session) {
        throw createHttpError(401, `Session not found`);
    }

    if (session.refreshTokenValidUntil < Date.now()) {
        await SessionCollection.findOneAndDelete({ _id: session._id });
        throw createHttpError(401, `Session token expired`);
    }

    await SessionCollection.findOneAndDelete({ _id: session._id });

    const newSession = createSession();

    return SessionCollection.create({
        userId: session.userId,
        ...newSession
    });
}

export const logoutUser = sessionId => SessionCollection.deleteOne({ _id: sessionId });

export const verifyUser = token => {
    try {
        const { email } = jwt.verify(token, jwtSecret);

        return UserCollection.findOneAndUpdate({ email }, { verify: true });
    } catch (error) {
        throw createHttpError(401, error.message);
    }
}

export const resetPassword = async email => {
    const user = await findUser({ email });
    if (!user) {
        throw createHttpError(404, `User not found`);
    }

    try {
        const templateHandlebars = Handlebars.compile(templateSource);
        const token = jwt.sign({ email }, jwtSecret, { expiresIn: '5min' });
        const html = templateHandlebars({
            resetPasswordLink: `${domain}/auth/reset-password?token=${token}`,
            text: 'Click To reset your password'
        });

        const resetPassword = {
            to: email,
            subject: 'Reset Password',
            html,
        }

        await sendEmail(resetPassword);
        return email;
    } catch (error) {
        throw createHttpError(500, error.message);
    }
}

export const setNewUserPassword = async (password, token) => {
    try {
        jwt.verify(token, jwtSecret);
    } catch (error) {
        throw createHttpError(401, "Token is expired or invalid.");
    }

    const { email } = jwt.verify(token, jwtSecret);
    const user = await findUser({ email });

    if (!user) {
        throw createHttpError(404, `User not found`);
    }

    const hashPassword = await bcrypt.hash(password, 12);

    return UserCollection.findOneAndUpdate({ email }, { password: hashPassword });
}
