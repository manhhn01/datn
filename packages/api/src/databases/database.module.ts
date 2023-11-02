import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/databases/database.service';

@Module({
  imports: [],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
