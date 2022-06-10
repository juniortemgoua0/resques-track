import {IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";

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