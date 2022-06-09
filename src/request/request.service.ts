/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {Model} from "mongoose";
import {RequestDocument} from "./request.schema";

@Injectable()
export class RequestService {

    constructor(@InjectModel(ModelName.REQUEST) private requestModel: Model<RequestDocument>) {
    }

    getAllRequests() {
        return this.requestModel.find();
    }

    getStudentRequests(studentId: string) {
        return this.requestModel.find().where({student: studentId});
    }

}
