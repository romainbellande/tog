import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NX_DATABASE_URL: Joi.string().uri({
    scheme: ['postgres']
  }).required(),
  NX_PORT: Joi.number().default(9000),
  NX_ENV: Joi.string().valid('development', 'production').default('development'),
});

export interface Configuration {
  databaseUrl: string;
  port: number;
}

export const configuration = (): Configuration => ({
  databaseUrl: process.env.NX_DATABASE_URL,
  port: parseInt(process.env.NX_PORT, 10),
});
