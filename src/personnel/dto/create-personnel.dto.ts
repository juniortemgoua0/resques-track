import {IsEmail, IsInt, IsNotEmpty, IsString} from "class-validator";

export class CreatePersonnelDto {

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

    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    school_id: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    department_id: string;

}