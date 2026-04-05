import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FlashcardService } from './flashcard.service';

class CreateFlashcardDto {
  @IsString() @IsNotEmpty() question: string;
  @IsString() @IsNotEmpty() answer: string;
  @IsArray() @IsOptional()  tags?: string[];
}

class AnswerFlashcardDto {
  @IsBoolean() isCorrect: boolean;
}

@UseGuards(JwtAuthGuard)
@Controller('flashcards')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Get()
  getAll(@Query('tag') tag?: string) {
    return tag
      ? this.flashcardService.getByTag(tag)
      : this.flashcardService.getAll();
  }

  @Get('review')
  getForReview() {
    return this.flashcardService.getDueForReview();
  }

  @Post()
  create(@Body() dto: CreateFlashcardDto) {
    return this.flashcardService.create(dto.question, dto.answer, dto.tags);
  }

  @Patch(':id/answer')
  answer(@Param('id') id: string, @Body() dto: AnswerFlashcardDto) {
    return this.flashcardService.answer(id, dto.isCorrect);
  }
}