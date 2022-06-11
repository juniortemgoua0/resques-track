import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {Request} from "./request.schema";
import * as mongoose from "mongoose";
import {ModelName} from "../../helpers";

export type LetterDocument = Letter & Document

@Schema({timestamps: true})
export class Letter {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: ModelName.LETTER})
    request: Request

    @Prop({required: true})
    objet: string;

    @Prop({required: true})
    letter_type: string;

    @Prop({required: false})
    description: string

    @Prop({required: false})
    file: string

}

export const LetterSchema = SchemaFactory.createForClass(Letter);