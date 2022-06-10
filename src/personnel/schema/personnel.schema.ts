import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {IsInt, IsNotEmpty, IsString} from "class-validator";
import * as mongoose from "mongoose";
import {ModelName} from "../../helpers";
import {Department} from "../../department/department.schema";
import {School} from "../../school/school.schema";
import {Role} from "./role.schema";

export type PersonnelDocument = Personnel & Document

@Schema({timestamps:true})
export class Personnel {

    @Prop({required: true})
    registration_number: string;

    @Prop({required: true})
    last_name: string;

    @Prop({required: true})
    first_name: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    phone_number: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.DEPARTMENT})
    department: Department

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.SCHOOL})
    school: School

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.ROLE})
    role: Role

}

export const PersonnelSchema = SchemaFactory.createForClass(Personnel)