import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {StudentDocument} from "./student.schema";
import {CreateStudentDto, UpdateStudentDto} from "./dto";
import {SchoolDocument} from "../school/school.schema";
import {ModelName} from "../helpers";
import {ClassroomDocument} from "../classroom/classroom.schema";
import {LevelDocument} from "../level/level.schema";

@Injectable()
export class StudentService {

    constructor(
        @InjectModel(ModelName.STUDENT) private readonly studentModel: Model<StudentDocument>,
        @InjectModel(ModelName.SCHOOL) private readonly schoolModel: Model<SchoolDocument>,
        @InjectModel(ModelName.CLASSROOM) private readonly classroomModel: Model<ClassroomDocument>,
        @InjectModel(ModelName.LEVEL) private readonly levelModel: Model<LevelDocument>
    ) {
    }

    getAllStudents() {
        return this.studentModel.find().populate(["classroom", "school"]).exec();
    }

    getOneStudent(studentId: string) {
        return this.studentModel.findById(studentId).populate(["classroom", "school"]).exec();
    }

    async createStudent(createStudentDto: CreateStudentDto) {

        const {school_id, classroom_id, level, ...remain} = createStudentDto

        const checkStudent = (await this.studentModel.findOne({email: remain.email})) ||
            (await this.studentModel.findOne({phone_number: remain.phone_number}));

        if (checkStudent) {
            throw new HttpException("email or phone_number taken", HttpStatus.UNAUTHORIZED);
        }

        const createdStudent = await new this.studentModel({
                ...remain,
                school: school_id,
                classroom: classroom_id
            }
        ).save();

        await this.schoolModel.findByIdAndUpdate(
            school_id,
            {$push: {students: createdStudent}},
            {new: true, upsert: true}
        )

        await this.classroomModel.findByIdAndUpdate(
            classroom_id,
            {$push: {students: createdStudent}},
            {new: true, upsert: true}
        ).where({})

        return createdStudent;
    }

    async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto) {
        const {email, phone_number} = updateStudentDto
        const checkStudentByEmail = await this.studentModel.findOne({email})

        if (checkStudentByEmail) {
            throw new HttpException("Email taken", HttpStatus.UNAUTHORIZED);
        }

        const checkStudentByNumber = await this.studentModel.findOne({phone_number})
        if (checkStudentByNumber) {
            throw new HttpException("Phone_number taken", HttpStatus.UNAUTHORIZED);
        }

        return this.studentModel.findByIdAndUpdate(
            studentId,
            {$set: {...updateStudentDto}},
            {new: true, upsert: true}
        )
    }

    deleteStudent(studentId: string) {
        return this.studentModel.findByIdAndDelete(studentId)
    }
}
