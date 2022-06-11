/* eslint-disable prettier/prettier */
import {IsArray, IsNotEmpty, IsNumber, IsObject, IsString} from "class-validator";
import {IDocument, ILetter} from "../interface";

export class UpdateRequestDto {

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

    @IsNumber()
    @IsNotEmpty()
    status: number;

}