import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex, { Knex } from 'knex';

export const KNEX_TOKEN = 'KNEX_CONNECTION';

@Global()
@Module({
  providers: [
    {
      provide: KNEX_TOKEN,
      inject: [ConfigService],
      useFactory: (config: ConfigService): Knex => {
        return knex({
          client: 'pg',
          connection: {
            host: config.get('DB_HOST'),
            port: config.get<number>('DB_PORT'),
            user: config.get('DB_USER'),
            password: config.get('DB_PASSWORD'),
            database: config.get('DB_NAME'),
          },
        });
      },
    },
  ],
  exports: [KNEX_TOKEN],
})
export class DatabaseModule {}
