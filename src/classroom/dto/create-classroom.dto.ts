/* eslint-disable prettier/prettier */
import {IsArray, IsNotEmpty, IsString} from "class-validator";

export class CreateClassroomDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    speciality_id: string

    @IsArray()
    courses: string[];
}