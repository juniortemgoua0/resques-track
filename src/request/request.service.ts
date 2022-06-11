/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ModelName, RequestStatus, RequestStep, RequestSubmitState} from "../helpers";
import {Model} from "mongoose";
import {RequestDocument} from "./schema/request.schema";
import {StudentDocument} from '../student/student.schema';
import {
    AssignRequestDto,
    ChangeStatusDto,
    CreateRequestDto,
    RejectRequestDto,
    TreatRequestDto,
    UpdateRequestDto
} from './dto';
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

        const {student_id, claim_id, submit_state, course_id, letter, ...remain} = createRequestDto;

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
            letter: letter,
            documents: documents,
            status: submit_state === RequestSubmitState.DRAFT ? RequestStatus.DRAFT : RequestStatus.SUBMITTED,
            request_step: submit_state === RequestSubmitState.DRAFT ? RequestStep.STEP_1 : RequestStep.STEP_2
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
            {
                $set: {
                    assign: {...assignRequestDto, assign_date: new Date()},
                    status: RequestStatus.TREATMENT_ASSIGNED
                }
            },
            {new: true, upsert: true}
        );
    }

    async getAllAssignRequests(schoolId: string) {

        let result = [];
        await this.getRequestsBySchool(schoolId)
            .then(res => res.filter(r => r.assign !== null))
            .then(res => result = res);

        return result;
    }

    async getTeacherAssignRequests(teacherId: string) {

        let schoolId;
        await this.personnelModel.findById(teacherId)
            .then(res => schoolId = res.school.toString())

        let result = [];
        await this.getAllAssignRequests(schoolId)
            .then(res => res.filter(r => r.assign.teacher_id === teacherId))
            .then(res => result = res);

        return result;
    }

    treatRequest(requestId: string, treatRequestDto: TreatRequestDto) {
        return this.requestModel.findByIdAndUpdate(
            requestId,
            {
                $set: {
                    treat: {...treatRequestDto, treat_date: new Date()},
                    status: RequestStatus.TREATMENT_AT_VERIFY
                }
            },
            {new: true, upsert: true}
        );
    }

    validateTreatRequest(requestId: string) {
        return this.requestModel.findByIdAndUpdate(
            requestId,
            {
                $set: {
                    request_step: RequestStep.STEP_4,
                    status: RequestStatus.DELIBERATION_PENDING
                }
            },
            {new: true, upsert: true}
        );
    }

    deliberateTreatRequest(requestId: string) {
        return this.requestModel.findByIdAndUpdate(
            requestId,
            {
                $set: {
                    request_step: RequestStep.STEP_5,
                    status: RequestStatus.PUBLISHING_PENDING,
                }
            },
            {new: true, upsert: true}
        );
    }

    async publishingRequest(requestId: string) {

        /*Les valeurs a l'interieur de cet objet permette juste
        *d'eviter les nullable exception pour les verifications plus bas*/
        let req = {
            treat: {
                final_note: 0
            },
            claim_note: 0,
            dispute_note: 0
        }

        await this.requestModel.findById(requestId)
            .then(res => req = res)

        return this.requestModel.findByIdAndUpdate(
            requestId,
            {
                $set: {
                    request_step: RequestStep.STEP_6,
                    status: req?.treat?.final_note === req?.claim_note || req?.treat?.final_note > req?.dispute_note ?
                        RequestStatus.PUBLISHING_AND_SUCCESS :
                        RequestStatus.PUBLISHING_AND_FAIL
                }
            },
            {new: true, upsert: true}
        );
    }

    rejectRequest(requestId: string, rejectRequestDto: RejectRequestDto) {
        return this.requestModel.findByIdAndUpdate(
            requestId,
            {
                $set: {
                    reject: {...rejectRequestDto, date: new Date()},
                    status: RequestStatus.REJECTED
                }
            },
            {new: true, upsert: true}
        );
    }

    acceptRequest(requestId: string) {
        return this.requestModel.findByIdAndUpdate(
            requestId,
            {
                $set: {
                    request_step: RequestStep.STEP_3,
                    status: RequestStatus.TREATMENT_PENDING,
                    accept: {date: new Date()}
                }
            },
            {new: true, upsert: true}
        );
    }

    deleteRequest(requestId: string) {
        return this.requestModel.findByIdAndDelete(requestId);
    }

}
