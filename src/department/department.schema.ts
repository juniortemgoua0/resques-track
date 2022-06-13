import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {Speciality} from "../speciality/speciality.schema";
import {ModelName} from "../helpers";
import {School} from "../school/school.schema";
import {Student} from "../student/student.schema";
import {Personnel} from "../personnel/schema/personnel.schema";

export type DepartmentDocument = Department & Document

@Schema({timestamps : true})
export class Department{

    @Prop({required: true})
    name: string;

    @Prop({type: mongoose.Schema.Types.ObjectId , ref: ModelName.SCHOOL})
    school: School;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId , ref: ModelName.SPECIALITY}] , default: []})
    specialities: Speciality[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:ModelName.PERSONNEL})
    head_of_department: Personnel
}

export const DepartmentSchema = SchemaFactory.createForClass(Department)