import {IsInt, IsNotEmpty, IsString, MinLength} from "class-validator";

export class SignUpDto{

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    phone_number: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string

}