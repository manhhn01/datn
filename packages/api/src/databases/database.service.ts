import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        'info',
        'warn',
        'error',
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', async (e: any) => {
      console.log('QUERY:', e.query);
      console.log('PARAMS:', e.params);
    });
  }
}
