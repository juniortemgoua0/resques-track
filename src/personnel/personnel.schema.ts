import {Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type PersonnelDocument = Personnel & Document

@Schema()
export class Personnel{

}

export const PersonnelSchema = SchemaFactory.createForClass(Personnel)