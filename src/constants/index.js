import path from 'path';

export const sortList = ['asc', 'desc'];

export const TEMPLATES_DIR = path.resolve('src', 'templates');

export const TEMP_FILES_DIR = path.resolve('.', 'temp');
export const UPLOADS_FILES_DIR = path.resolve('.', 'uploads');

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const accessTokenLifeTime = 1000 * 60 * 15;
export const refreshTokenLifeTime = 1000 * 60 * 60 * 24 * 30;

export const typeList = ['work', 'home', 'personal']

