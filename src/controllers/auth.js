import * as authService from '../services/auth.js';

export const registerController = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      status: '201',
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, sessionId } = await authService.login(req.body);
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.cookie('sessionId', sessionId, { httpOnly: true });

    res.status(200).json({
      status: '200',
      message: 'Successfully logged in an user!',
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};

export const refreshController = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ status: '401', message: 'Refresh token missing' });
    }

    const { accessToken, refreshToken: newRefreshToken, sessionId } = await authService.refresh(refreshToken);

    res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
    res.cookie('sessionId', sessionId, { httpOnly: true });

    res.status(200).json({
      status: '200',
      message: 'Successfully refreshed a session!',
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ status: '401', message: 'Refresh token missing' });
    }

    await authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');
    res.status(201).send();
  } catch (err) {
    next(err);
  }
};
