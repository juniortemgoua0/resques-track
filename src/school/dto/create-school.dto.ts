/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from "class-validator";

export class CreateSchoolDto{

    @IsString()
    @IsNotEmpty()
    name: string;

}