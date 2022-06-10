import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import * as mongoose from "mongoose";
import {ModelName} from "../helpers";
import {Classroom} from "../classroom/classroom.schema";
import {Student} from "../student/student.schema";

export type LevelDocument = Level & Document;

@Schema({timestamps: true})
export class Level {

    @Prop({required: true})
    level: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.CLASSROOM})
    classroom: Classroom;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: ModelName.STUDENT}]})
    student: Student[];

}

export const LevelSchema = SchemaFactory.createForClass(Level)