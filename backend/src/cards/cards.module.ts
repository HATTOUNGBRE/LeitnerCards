import { Module } from '@nestjs/common';
import { CARD_ID_GENERATOR } from './application/card-id-generator.port';
import { CARD_REPOSITORY } from './application/card.repository';
import { CreateCardUseCase } from './application/create-card.use-case';
import { DeleteCardUseCase } from './application/delete-card.use-case';
import { GetCardByIdUseCase } from './application/get-card-by-id.use-case';
import { ListCardsByOwnerUseCase } from './application/list-cards-by-owner.use-case';
import { UpdateCardUseCase } from './application/update-card.use-case';
import { InMemoryCardIdGenerator } from './infrastructure/identifiers/in-memory-card-id-generator';
import { InMemoryCardRepository } from './infrastructure/persistence/in-memory-card.repository';
import { CardsController } from './interfaces/http/cards.controller';

@Module({
  controllers: [CardsController],
  providers: [
    {
      provide: CARD_REPOSITORY,
      useClass: InMemoryCardRepository,
    },
    {
      provide: CARD_ID_GENERATOR,
      useClass: InMemoryCardIdGenerator,
    },
    {
      provide: CreateCardUseCase,
      inject: [CARD_REPOSITORY, CARD_ID_GENERATOR],
      useFactory: (cardRepository, cardIdGenerator) =>
        new CreateCardUseCase(cardRepository, cardIdGenerator),
    },
    {
      provide: GetCardByIdUseCase,
      inject: [CARD_REPOSITORY],
      useFactory: (cardRepository) => new GetCardByIdUseCase(cardRepository),
    },
    {
      provide: ListCardsByOwnerUseCase,
      inject: [CARD_REPOSITORY],
      useFactory: (cardRepository) => new ListCardsByOwnerUseCase(cardRepository),
    },
    {
      provide: UpdateCardUseCase,
      inject: [CARD_REPOSITORY],
      useFactory: (cardRepository) => new UpdateCardUseCase(cardRepository),
    },
    {
      provide: DeleteCardUseCase,
      inject: [CARD_REPOSITORY],
      useFactory: (cardRepository) => new DeleteCardUseCase(cardRepository),
    },
  ],
  exports: [CARD_REPOSITORY, CARD_ID_GENERATOR],
})
export class CardsModule {}
