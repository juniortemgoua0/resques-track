/* eslint-disable prettier/prettier */
import mongoose, {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Classroom} from "../classroom/classroom.schema";
import {ModelName} from "../helpers";
import {Department} from "../department/department.schema";

export type SpecialityDocument = Speciality & Document

@Schema({timestamps: true})
export class Speciality {

    @Prop({required: true})
    name:string

    @Prop({type: mongoose.Schema.Types.ObjectId , ref: ModelName.DEPARTMENT})
    department: Department;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId , ref: ModelName.CLASSROOM}] , default: []})
    classrooms: Classroom[];

}

export const SpecialitySchema = SchemaFactory.createForClass(Speciality)