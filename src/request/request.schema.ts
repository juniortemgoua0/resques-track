import {Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type RequestDocument = Request & Document;

@Schema({timestamps:true})
export class Request{

}

export const RequestSchema = SchemaFactory.createForClass(Request);