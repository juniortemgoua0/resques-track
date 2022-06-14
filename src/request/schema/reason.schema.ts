import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export  type ReasonDocument = Reason & Document

@Schema({timestamps:true})
export class Reason{

    @Prop({required:true})
    name: string

}

export const ReasonSchema = SchemaFactory.createForClass(Reason)