/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {Model} from "mongoose";
import {RequestDocument} from "./schema/request.schema";
import {StudentDocument} from '../student/student.schema';
import {AssignRequestDto, ChangeStatusDto, CreateRequestDto, TreatRequestDto} from './dto';
import {UpdateRequestDto} from './dto';
import {ClaimDocument} from "./schema/claim.schema";
import {DocumentDocument} from "./schema/document.schema";
import {LetterDocument} from "./schema/letter.schema";
import {SchoolDocument} from "../school/school.schema";
import {PersonnelDocument} from "../personnel/schema/personnel.schema";

@Injectable()
export class RequestService {

    constructor(
        @InjectModel(ModelName.REQUEST) private readonly requestModel: Model<RequestDocument>,
        @InjectModel(ModelName.STUDENT) private readonly studentModel: Model<StudentDocument>,
        @InjectModel(ModelName.SCHOOL) private readonly schoolModel: Model<SchoolDocument>,
        @InjectModel(ModelName.PERSONNEL) private readonly personnelModel: Model<PersonnelDocument>,
        @InjectModel(ModelName.CLAIM) private readonly claimModel: Model<ClaimDocument>,
        @InjectModel(ModelName.DOCUMENT) private readonly documentModel: Model<DocumentDocument>,
        @InjectModel(ModelName.LETTER) private readonly letterModel: Model<LetterDocument>
    ) {
    }


    getAllRequests() {
        return this.requestModel.find()
            .populate(['course', 'student', 'letter', 'documents', 'claim']);
    }

    getStudentRequests(studentId: string) {
        return this.requestModel.findById(studentId)
            .populate(['course', 'student', 'letter', 'documents', 'claim']);
    }

    getOneRequest(RequestId: string) {
        return this.requestModel.findById(RequestId);
    }

    /*
    * Allowed to retrieve all request data corresponds to schoolId parameter*/
    async getRequestsBySchool(schoolId: string) {

        let result = []
        await this.requestModel.find()
            .populate(['course', 'student', 'letter', 'documents', 'claim'])
            .then(res => res.filter(r => r.student?.school?.toString() === schoolId))
            .then(res => result = res)

        return result;

    }

    getRequestsByStatus(status: number) {
        return this.requestModel.find({status: status})
            .populate(['course', 'student', 'letter', 'documents', 'claim']);
    }


    async createStudentRequest(createRequestDto: CreateRequestDto) {

        const {student_id, claim_id, course_id, letter, ...remain} = createRequestDto;

        const newLetter = await new this.letterModel(letter).save()

        const documents = [];
        let i = 0;
        if (remain.documents.length > 0) {
            for (const document of remain.documents) {
                documents[i] = await new this.documentModel(document)._id
                i++
            }
        }

        const createdRequest = await new this.requestModel({
            ...remain,
            student: student_id,
            claim: claim_id,
            course: course_id,
            letter: newLetter,
            documents: documents,
        }).save();

        await this.studentModel.findByIdAndUpdate(
            student_id,
            {$push: {requests: createdRequest}},
            {new: true, upsert: true}
        );

        return createdRequest;
    }

    async updateStudentRequest(requestId: string, updateRequestDto: UpdateRequestDto) {

    }

    changeRequestStatus(requestId: string, changeStatusDto: ChangeStatusDto) {

        const {status, request_step} = changeStatusDto

        return this.requestModel.findByIdAndUpdate(
            requestId,
            {$set: {status, request_step}},
            {new: true, upsert: true}
        )

    }

    async assignRequestToTeacher(requestId: string, assignRequestDto: AssignRequestDto) {
        return this.requestModel.findByIdAndUpdate(
            requestId,
            {$set: {assign: assignRequestDto}},
            {new: true, upsert: true}
        )
    }

    async getAllAssignRequests(schoolId: string) {

        let result = [];
        await this.getRequestsBySchool(schoolId)
            .then(res => res.filter(r => r.assign !== null))
            .then(res => result = res)

        return result
    }

    async getTeacherAssignRequests(teacherId: string) {

        let schoolId
        await this.personnelModel.findById(teacherId)
            .then(res => schoolId = res.school.toString())

        let result = [];
        await this.getAllAssignRequests(schoolId)
            .then(res => res.filter(r => r.assign.teacher_id === teacherId))
            .then(res => result = res)

        return result
    }

    treatRequest(requestId: string, treatRequestDto: TreatRequestDto) {
        return this.requestModel.findByIdAndUpdate(
            requestId,
            {$set: {treat: treatRequestDto}},
            {new: true, upsert: true}
        );
    }

    deleteRequest(requestId: string) {
        return this.requestModel.findByIdAndDelete(requestId);
    }

}
