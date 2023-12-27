import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/databases/database.module';

const modules = [DatabaseModule];

@Global()
@Module({
  imports: modules,
  providers: modules,
  exports: modules,
  
})
export class CommonModule {}
