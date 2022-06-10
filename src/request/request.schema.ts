/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import { Department } from './../department/department.schema';
import { School } from "src/school/school.schema";
import { Course } from "src/course/course.schema";
import { Student } from './../student/student.schema';
import { ModelName } from './../helpers/model-helpers';
import mongoose, {Document} from "mongoose";

export type RequestDocument = Request & Document;

@Schema({timestamps:true})
export class Request{

    @Prop({required:true})
    type_of_query:string;

    @Prop({required:true})
    status:string;

    @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref:ModelName.DEPARTMENT}]})
    department:Department;

    
    @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref:ModelName.STUDENT}]})
    student:Student;

    @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref:ModelName.SCHOOL}]})
    faculty:School;

    @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref:ModelName.COURSE
    }]})
    level:Course;
}

export const RequestSchema = SchemaFactory.createForClass(Request);