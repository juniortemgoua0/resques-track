import {IsArray, IsNotEmpty, IsString} from "class-validator";

export class UpdateCourseDto {

    @IsArray()
    classes: string[];

    @IsNotEmpty()
    @IsString()
    name: string;

}