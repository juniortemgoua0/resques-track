/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from "class-validator";

export class CreateDepartmentDto{

    @IsNotEmpty()
    @IsString()
    name:string

    @IsString()
    @IsNotEmpty()
    school_id: string
}