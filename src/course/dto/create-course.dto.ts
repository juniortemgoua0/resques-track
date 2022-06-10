/* eslint-disable prettier/prettier */
import {IsArray, IsNotEmpty, IsString} from "class-validator";
import {Classroom} from "../../classroom/classroom.schema";
import * as mongoose from "mongoose";

export class CreateCourseDto {

    @IsArray()
    classrooms: string[];

    @IsNotEmpty()
    @IsString()
    name: string;

}