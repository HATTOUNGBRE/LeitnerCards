export interface QuizSession {
    id: string;
    userId: string;
    flashcardIds: string[];
    score: number;
    startedAt: Date;
    endedAt: Date | null;
}