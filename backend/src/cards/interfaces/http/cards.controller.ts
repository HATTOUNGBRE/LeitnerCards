import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateCardUseCase } from '../../application/create-card.use-case';
import { DeleteCardUseCase } from '../../application/delete-card.use-case';
import { GetCardByIdUseCase } from '../../application/get-card-by-id.use-case';
import { ListCardsByOwnerUseCase } from '../../application/list-cards-by-owner.use-case';
import { ListCardsByTagsUseCase } from '../../application/list-cards-by-tags.use-case';
import { ListDueCardsByOwnerUseCase } from '../../application/list-due-cards-by-owner.use-case';
import { ReviewCardUseCase } from '../../application/review-card.use-case';
import { UpdateCardUseCase } from '../../application/update-card.use-case';
import { CreateCardDto } from './dto/create-card.dto';
import { ReviewCardDto } from './dto/review-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(
    private readonly createCardUseCase: CreateCardUseCase,
    private readonly getCardByIdUseCase: GetCardByIdUseCase,
    private readonly listCardsByOwnerUseCase: ListCardsByOwnerUseCase,
    private readonly listCardsByTagsUseCase: ListCardsByTagsUseCase,
    private readonly listDueCardsByOwnerUseCase: ListDueCardsByOwnerUseCase,
    private readonly reviewCardUseCase: ReviewCardUseCase,
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

  @Get('tags')
  findByTags(@Query('tags') tags: string | string[]) {
    const parsedTags = this.parseTags(tags);
    return this.listCardsByTagsUseCase.execute({ tags: parsedTags });
  }

  @Get('due')
  findDueByOwner(
    @Query('ownerId') ownerId: string,
    @Query('referenceDate') referenceDate?: string,
  ) {
    return this.listDueCardsByOwnerUseCase.execute({
      ownerId,
      referenceDate: referenceDate ? new Date(referenceDate) : undefined,
    });
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
      tag: dto.tag,
    });
  }

  @Post(':id/review')
  review(@Param('id') id: string, @Body() dto: ReviewCardDto) {
    return this.reviewCardUseCase.execute({
      cardId: id,
      isValid: dto.isValid,
      referenceDate: dto.referenceDate
        ? new Date(dto.referenceDate)
        : undefined,
    });
  }

  private parseTags(tags: string | string[] | undefined): string[] {
    if (!tags) {
      return [];
    }

    const normalized = Array.isArray(tags) ? tags : [tags];
    return normalized
      .flatMap((value) => value.split(','))
      .map((raw) => raw.trim())
      .filter(Boolean);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCardUseCase.execute(id);
  }
}
