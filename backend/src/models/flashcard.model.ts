export interface Flashcard {
    id: string;
    question: string;
    answer: string;
    category: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date | null;
    isLearned: boolean;
}