import dotenv from "dotenv";
dotenv.config();

const config = {
  app: {
    name: process.env.APP_NAME,
    port: parseInt(process.env.PORT, 10),
    environment: process.env.NODE_ENV,
    url: process.env.APP__URL,
  },
  api: {
    prefix: process.env.API_PREFIX,
    rateLimit: {
      windowMs: parseInt(process.env.API_RATE_LIMIT_TIME, 10),
      max: parseInt(process.env.API_RATE_LIMIT, 10),
    },
  },
  database: {
    MONGO_URI: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};

export default config;
