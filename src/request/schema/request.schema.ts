/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import {Course} from "src/course/course.schema";
import {Student} from '../../student/student.schema';
import {ModelName, RequestStatus} from '../../helpers';
import {IDocument, ILetter, ITreat} from "../interface"
import mongoose, {Document} from "mongoose";
import {IAssign} from "../interface";
import {IReject} from "../interface/IReject";

export type RequestDocument = Request & Document;

@Schema({timestamps: true})
export class Request {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.STUDENT})
    student: Student;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.CLAIM})
    claim: string;

    @Prop({required: true})
    dispute_note: number;

    @Prop({required: true})
    claim_note: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.COURSE})
    course: Course;

    @Prop({required: true})
    letter: ILetter<string>;

    @Prop({default: []})
    documents: IDocument<string>[];

    @Prop({required: false, default: RequestStatus.DRAFT})
    status: number;

    @Prop({default: 1})
    request_step: number;

    @Prop({required: false , default: {}})
    assign: IAssign;

    @Prop({required: false, default: {}})
    reject: IReject;

    @Prop({required: false, default: {}})
    treat: ITreat;
}

export const RequestSchema = SchemaFactory.createForClass(Request);