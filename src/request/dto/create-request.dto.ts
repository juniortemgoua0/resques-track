/* eslint-disable prettier/prettier */
import {IsArray, IsNotEmpty, IsNumber, IsObject, IsString} from "class-validator";
import {ILetter, IDocument} from "../interface";

export class CreateRequestDto {

    @IsString()
    @IsNotEmpty()
    student_id: string;

    @IsString()
    @IsNotEmpty()
    claim_id: string;

    @IsString()
    @IsNotEmpty()
    course_id: string;

    @IsNumber()
    @IsNotEmpty()
    dispute_note: number;

    @IsNumber()
    @IsNotEmpty()
    claim_note: number;

    @IsObject()
    letter: ILetter<string>;

    @IsArray()
    documents: IDocument<string>[];

    @IsString()
    @IsNotEmpty()
    submit_state: string;
}
