export default {
    PORT: process.env.PORT || 3000,
    APP_NAME: process.env.APP_NAME,
    NODE_ENV: process.env.NODE_ENV,
    SECRET: process.env.JWT_SECRET_KEY,
    ENVIRONMENT: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
};