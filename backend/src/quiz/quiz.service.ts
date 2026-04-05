import { ConflictException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { quizSessions } from '../data/data';
import { QuizSession } from 'src/models/quizz-session.model';

@Injectable()
export class QuizService {

  isAvailable(userId: string): boolean {
    const last = this.getLastSession(userId);
    if (!last) return true;
    return !this.isToday(last.startedAt);
  }

  startSession(userId: string): QuizSession {
    if (!this.isAvailable(userId)) {
      throw new ConflictException('Quiz already done today');
    }
    const session: QuizSession = {
      id: uuidv4(),
      userId,
      startedAt: new Date(),
      flashcardIds: [],
      score: 0,
      endedAt: null,
    };
    quizSessions.push(session);
    return session;
  }

  private getLastSession(userId: string): QuizSession | null {
    const userSessions = quizSessions.filter((s) => s.userId === userId);
    if (!userSessions.length) return null;
    return userSessions.sort((a, b) =>
      b.startedAt.getTime() - a.startedAt.getTime()
    )[0];
  }

  private isToday(date: Date): boolean { // checks if the date is today
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth()    === today.getMonth()    &&
      date.getDate()     === today.getDate()
    );
  }
}