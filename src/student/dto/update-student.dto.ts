import {IsInt, IsNotEmpty, IsString} from "class-validator";

export class UpdateStudentDto{

    @IsString()
    @IsNotEmpty()
    registration_number:string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsInt()
    @IsNotEmpty()
    phone_number: number;
}