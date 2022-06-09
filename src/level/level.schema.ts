import {Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type LevelDocument = Level & Document;

@Schema({timestamps:true})
export class Level{

}

export const LevelSchema = SchemaFactory.createForClass(Level)