import {IsInt, IsNotEmpty, IsString} from "class-validator";

export class UpdatePersonnelDto{

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

    @IsString()
    @IsNotEmpty()
    department_id: string

}