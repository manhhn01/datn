import { CandidateBookmarkRepository } from '@modules/candidate-bookmark/candidate-bookmark.repository';
import { DocumentRepository } from '@modules/document/document.resposioty';
import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/databases/database.service';

const repositories = [DocumentRepository, CandidateBookmarkRepository];

@Module({
  imports: [],
  providers: [DatabaseService, ...repositories],
  exports: [DatabaseService, ...repositories],
})
export class DatabaseModule {}
