/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from "class-validator";

export class UpdateDepartmentDto{

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsString()
    @IsNotEmpty()
    school_id: string;

    @IsString()
    @IsNotEmpty()
    head_of_department: string;
}