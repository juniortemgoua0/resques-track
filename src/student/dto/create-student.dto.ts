import {IsEmail, IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength} from "class-validator";

export class CreateStudentDto {

    @IsString()
    @IsNotEmpty()
    registration_number: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone_number: string | number;

    @IsString()
    @IsNotEmpty()
    school_id: string

    @IsString()
    @IsNotEmpty()
    classroom_id: string
}