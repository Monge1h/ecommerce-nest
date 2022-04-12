import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      URI: process.env.DATABASE_URL,
    },
  };
});
