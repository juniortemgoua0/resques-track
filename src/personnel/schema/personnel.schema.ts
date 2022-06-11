import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
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
    phone_number: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.SCHOOL})
    school: School

    @Prop({required:true})
    role: string

}

export const PersonnelSchema = SchemaFactory.createForClass(Personnel)