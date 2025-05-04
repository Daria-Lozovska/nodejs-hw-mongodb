import createHttpError from 'http-errors';
import Session from '../models/session.js';
import User from '../models/user.js';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) return next(createHttpError(401, 'Access token missing'));

  const session = await Session.findOne({ accessToken: token });

  if (!session) return next(createHttpError(401, 'Invalid access token'));
  if (session.accessTokenValidUntil < new Date())
    return next(createHttpError(401, 'Access token expired'));

  const user = await User.findById(session.userId);
  if (!user) return next(createHttpError(401, 'User not found'));

  req.user = user;
  next();
};

export default authenticate;
