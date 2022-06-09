import mongoose, {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Student} from "../student/student.schema";
import {Course} from "../course/course.schema";
import {ModelName} from "../helpers";
import {Speciality} from "../speciality/speciality.schema";

export type ClassroomDocument = Classroom & Document

@Schema({timestamps: true})
export class Classroom {

    @Prop({required: true})
    name: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.SPECIALITY})
    speciality: Speciality;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: ModelName.STUDENT}], default: []})
    students: Student[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: ModelName.COURSE}], default: []})
    courses: Course[];

}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom)