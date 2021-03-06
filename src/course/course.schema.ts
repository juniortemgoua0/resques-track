/* eslint-disable prettier/prettier */
import mongoose, {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Classroom} from "../classroom/classroom.schema";
import {ModelName} from "../helpers";

export type CourseDocument = Course & Document

@Schema({timestamps: true})
export class Course {

    @Prop({required: true})
    name: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: ModelName.CLASSROOM}], default: []})
    classrooms: Classroom[];

}

export const CourseSchema = SchemaFactory.createForClass(Course)