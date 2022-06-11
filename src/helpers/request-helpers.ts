export enum RequestStatus {
    DRAFT = 1,
    WAITING_FOR_VALIDATION = 2,
    WAITING_FOR_TREATMENT = 3,
    WAITING_FOR_DELIBERATION = 4,
    WAITING_FOR_PUBLICATION = 5,
    TO_ENCLOSE = 6
}

export enum LetterType{
    ELECTRONIC_LETTER= "electronic",
    HANDWRITTEN_LETTER = "handwritten"
}