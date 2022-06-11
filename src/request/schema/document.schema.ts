import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type DocumentDocument = DocumentR & Document

@Schema({timestamps:true})
export class DocumentR{

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    file: string;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentR);