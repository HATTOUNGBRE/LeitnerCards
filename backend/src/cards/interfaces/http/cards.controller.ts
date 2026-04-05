import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateCardUseCase } from '../../application/create-card.use-case';
import { DeleteCardUseCase } from '../../application/delete-card.use-case';
import { GetCardByIdUseCase } from '../../application/get-card-by-id.use-case';
import { ListCardsByOwnerUseCase } from '../../application/list-cards-by-owner.use-case';
import { UpdateCardUseCase } from '../../application/update-card.use-case';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly createCardUseCase: CreateCardUseCase,
    private readonly getCardByIdUseCase: GetCardByIdUseCase,
    private readonly listCardsByOwnerUseCase: ListCardsByOwnerUseCase,
    private readonly updateCardUseCase: UpdateCardUseCase,
    private readonly deleteCardUseCase: DeleteCardUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCardDto) {
    return this.createCardUseCase.execute(dto);
  }

  @Get()
  findByOwner(@Query('ownerId') ownerId: string) {
    return this.listCardsByOwnerUseCase.execute(ownerId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getCardByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCardDto) {
    return this.updateCardUseCase.execute({
      cardId: id,
      question: dto.question,
      answer: dto.answer,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCardUseCase.execute(id);
  }
}
