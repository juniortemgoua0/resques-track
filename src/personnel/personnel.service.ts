import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {Model} from "mongoose";
import {PersonnelDocument} from "./personnel.schema";

@Injectable()
export class PersonnelService {

    constructor(@InjectModel(ModelName.PERSONNEL) private personnelModel: Model<PersonnelDocument>) {
    }

}
