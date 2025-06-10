import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User from '../models/user.js';
import Session from '../models/session.js';

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw createHttpError(401, 'Not authorized');
    }

    const payload = jwt.verify(token, process.env.ACCESS_SECRET);

    const session = await Session.findOne({
      userId: payload.id,
      accessToken: token,
    });

    if (!session) {
      throw createHttpError(401, 'Invalid session');
    }

    if (new Date(session.accessTokenValidUntil) < new Date()) {
      throw createHttpError(401, 'Access token expired');
    }

    const user = await User.findById(payload.id);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    req.user = user;
    req.token = token;
    req.session = session;

    next();
  } catch (err) {
    next(createHttpError(401, err.message));
  }
};

export default authenticate;

