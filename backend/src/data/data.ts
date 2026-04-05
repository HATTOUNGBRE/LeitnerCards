import { Flashcard } from "src/models/flashcard.model";
import { QuizSession } from "src/models/quizz-session.model";

export const SEED_USERS = [

    { id: '1',username:'test', email: 'test@mail.com', password: 'password', pseudo: 'testpseudo'},
    { id: '2',username:'john', email: 'john@mail.com', password: 'password', pseudo: 'johnpseudo'},
    { id: '3',username: 'shantal', email: 'shantal@mail.com', password: 'password', pseudo: 'shantalspseudo'}

];

export const flashcards: Flashcard[] = [];

export const quizSessions: QuizSession[] = [];