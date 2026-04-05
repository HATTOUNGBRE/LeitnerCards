import { Module } from '@nestjs/common';
import { CARD_ID_GENERATOR } from './application/card-id-generator.port';
import { CARD_REPOSITORY } from './application/card.repository';
import { InMemoryCardIdGenerator } from './infrastructure/identifiers/in-memory-card-id-generator';
import { InMemoryCardRepository } from './infrastructure/persistence/in-memory-card.repository';

@Module({
  providers: [
    {
      provide: CARD_REPOSITORY,
      useClass: InMemoryCardRepository,
    },
    {
      provide: CARD_ID_GENERATOR,
      useClass: InMemoryCardIdGenerator,
    },
  ],
  exports: [CARD_REPOSITORY, CARD_ID_GENERATOR],
})
export class CardsModule {}
