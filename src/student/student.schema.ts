import mongoose, {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Classroom} from "../classroom/classroom.schema";
import {School} from "../school/school.schema";
import {ModelName} from "../helpers/model-helpers";

export type StudentDocument = Student & Document

@Schema({timestamps: true})
export class Student {

    @Prop({required: true})
    registration_number:string;

    @Prop({required: true})
    last_name: string;

    @Prop({ required: true})
    first_name: string;

    @Prop({ required: true})
    email: string;

    @Prop({required: true})
    phone_number: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.CLASSROOM})
    classroom: Classroom;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.SCHOOL})
    school: School;

}

export const StudentSchema = SchemaFactory.createForClass(Student)