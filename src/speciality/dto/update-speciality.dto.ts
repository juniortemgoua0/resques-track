/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from "class-validator";

export class UpdateSpecialityDto{

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    department_id: string;

}