import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuizService } from './quiz.service';

@UseGuards(JwtAuthGuard)
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('available')
  checkAvailability(@Request() req: any) {
    return { available: this.quizService.isAvailable(req.user.userId) };
  }

  @Post('start')
  startQuiz(@Request() req: any) {
    return this.quizService.startSession(req.user.userId);
  }
}