/* eslint-disable prettier/prettier */
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {Department} from "../department/department.schema";
import {Student} from "../student/student.schema";
import {ModelName} from "../helpers";

export type SchoolDocument = School & Document;

@Schema({timestamps: true})
export class School {

    @Prop({required: true})
    name: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: ModelName.DEPARTMENT}], default: []})
    departments: Department[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: ModelName.STUDENT}], default: []})
    students: Student[];
}

export const SchoolSchema = SchemaFactory.createForClass(School);