import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {Student} from "../student/student.schema";
import {ModelName} from "../helpers";

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {

    @Prop({required: false, default: ""})
    username: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    phone_number: string;

    @Prop({required: true})
    password: string;

    @Prop({default: ""})
    signature: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.STUDENT})
    student: Student;

}

export const UserSchema = SchemaFactory.createForClass(User);
