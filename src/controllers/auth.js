import * as authService from '../services/auth.js';

export const registerController = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ status: 'success', message: 'Successfully registered a user!', data: user });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.login(req.body);
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.status(200).json({ status: 'success', message: 'Successfully logged in an user!', data: { accessToken } });
  } catch (err) {
    next(err);
  }
};

export const refreshController = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const tokens = await authService.refresh(refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    res.status(200).json({ status: 'success', message: 'Successfully refreshed a session!', data: { accessToken: tokens.accessToken } });
  } catch (err) {
    next(err);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
