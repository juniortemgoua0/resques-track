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

    /*
   * These are a new fields
   * */
    @IsString()
    @IsNotEmpty()
    department_id: string

    @IsString()
    @IsNotEmpty()
    speciality_id: string

    @IsString()
    @IsNotEmpty()
    level: string
}