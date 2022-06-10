/* eslint-disable prettier/prettier */
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {Model} from "mongoose";
import {RequestDocument} from "./request.schema";
import { StudentDocument } from './../student/student.schema';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';


@Injectable()
export class RequestService {

    constructor(
        @InjectModel(ModelName.REQUEST) private requestModel: Model<RequestDocument>,
        @InjectModel(ModelName.REQUEST) private studentModel: Model<StudentDocument>) 
        {}
    

    getAllRequests() {
        return this.requestModel.find();
    }

    getOneRequest(RequestId:string){
        return this.requestModel.findById(RequestId);
    }

     async createStudentRequest(createRequestDto: CreateRequestDto) {

        const {student_id, ...remain} = createRequestDto;

        const checkRequest = await this.requestModel.findOne({name: remain.request_id})
        if (checkRequest) {
            throw new HttpException("name taken", HttpStatus.UNAUTHORIZED)
        }

        const createdRequest = await new this.requestModel({
            ...remain,
            student: student_id
        }).save();

        await this.requestModel.findByIdAndUpdate(
            student_id,
            {$push: {requests: createdRequest}},
            {new: true, upsert: true}
        );

        return createdRequest;
    }

     async updateStudentRequest(requestId: string, updateRequestDto: UpdateRequestDto) {

        const {student_id, ...remain} = updateRequestDto;

        const checkRequest = await this.requestModel.findOne({name: remain.request_id})

        if (checkRequest) {
            throw new HttpException("name taken", HttpStatus.UNAUTHORIZED)
        }
        return this.requestModel.findByIdAndUpdate(
            requestId,
            {$set: { request : student_id , ...remain}},
            {new: true, upsert: true}
        )
    }

    deleteRequest(requestId: string) {
        return this.requestModel.findByIdAndDelete(requestId);
    }
    
    getStudentRequests(studentId: string) {
        return this.requestModel.find().where({student: studentId});
    }

}
