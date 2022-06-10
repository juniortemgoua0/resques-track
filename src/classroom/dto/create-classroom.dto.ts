/* eslint-disable prettier/prettier */
import {IsArray, IsNotEmpty, IsString, IsNumber} from "class-validator";

export class CreateClassroomDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    level: string;

    @IsString()
    @IsNotEmpty()
    speciality_id: string

    @IsArray()
    courses: string[];
}