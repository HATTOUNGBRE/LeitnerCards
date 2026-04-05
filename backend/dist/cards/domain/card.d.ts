export declare const INITIAL_CARD_CATEGORY = 1;
export type CardCategory = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type CreateCardProps = {
    id: string;
    ownerId: string;
    question: string;
    answer: string;
    createdAt?: Date;
};
export type CardSnapshot = {
    id: string;
    ownerId: string;
    question: string;
    answer: string;
    category: CardCategory;
    createdAt: Date;
};
export declare class Card {
    private readonly snapshot;
    private constructor();
    static create(props: CreateCardProps): Card;
    static rehydrate(snapshot: CardSnapshot): Card;
    get id(): string;
    get ownerId(): string;
    get question(): string;
    get answer(): string;
    get category(): CardCategory;
    get createdAt(): Date;
    updateContent(props: {
        question: string;
        answer: string;
    }): Card;
    toSnapshot(): CardSnapshot;
    private static isValidCategory;
    private static normalizeRequiredField;
}
