import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export  type ClaimDocument = Claim & Document

@Schema({timestamps:true})
export class Claim{

    @Prop({required:true})
    name: string

}

export const ClaimSchema = SchemaFactory.createForClass(Claim);