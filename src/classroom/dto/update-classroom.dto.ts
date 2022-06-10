import {IsArray, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class UpdateClassroomDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    level: number;

    @IsString()
    @IsNotEmpty()
    speciality_id: string

    @IsArray()
    courses: string[];
}