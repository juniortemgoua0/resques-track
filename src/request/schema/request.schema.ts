/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import {Course} from "src/course/course.schema";
import {Student} from '../../student/student.schema';
import {ModelName, RequestStatus, RequestStep} from '../../helpers';
import {IAccept, IDocument, ILetter, ITreat} from "../interface"
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
    status: string;

    @Prop({required: false, default: RequestStep.STEP_1})
    request_step: number;

    @Prop({type: IAssign, required: false, default: {}})
    assign: IAssign;

    @Prop({type: IReject, required: false, default: {}})
    reject: IReject;

    @Prop({type: ITreat, required: false, default: {}})
    treat: ITreat;

    @Prop({type: IAccept, required: false, default: {}})
    accept: IAccept;
}

export const RequestSchema = SchemaFactory.createForClass(Request);