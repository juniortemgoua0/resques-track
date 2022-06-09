import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateClassroomDto, UpdateClassroomDto} from "./dto";
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {Model} from "mongoose";
import {ClassroomDocument} from "./classroom.schema";
import {SpecialityDocument} from "../speciality/speciality.schema";
import {CourseDocument} from "../course/course.schema";

@Injectable()
export class ClassroomService {

    constructor(
        @InjectModel(ModelName.CLASSROOM) private readonly classroomModel: Model<ClassroomDocument>,
        @InjectModel(ModelName.SPECIALITY) private readonly specialityModel: Model<SpecialityDocument>,
        @InjectModel(ModelName.COURSE) private readonly courseModel: Model<CourseDocument>
    ) {
    }

    getAllClassrooms() {
        return this.classroomModel.find().populate(["students", "courses"]).exec();
    }

    getOneClassroom(classroomId: string) {
        return this.classroomModel.findById(classroomId).populate(["students", "courses"]).exec();
    }

    async createClassroom(createClassroomDto: CreateClassroomDto) {

        const {speciality_id, courses, ...remain} = createClassroomDto;

        const checkClassroom = await this.classroomModel.findOne({name: remain.name})
        if (checkClassroom) {
            throw new HttpException("name taken", HttpStatus.UNAUTHORIZED);
        }

        const createdClassroom = await new this.classroomModel({
            ...remain,
            speciality: speciality_id
        }).save();

        if (courses.length > 0) {
            for (const course_id of courses) {
                await this.courseModel.findByIdAndUpdate(
                    course_id,
                    {$push: {classrooms: createdClassroom}},
                    {new: true, upsert: true}
                );
            }
        }

        await this.specialityModel.findByIdAndUpdate(
            speciality_id,
            {$push: {classrooms: createdClassroom}},
            {new: true, upsert: true}
        );

        return createdClassroom;
    }

    async updateClassroom(classroomId: string, updateClassroomDto: UpdateClassroomDto) {
        const {speciality_id, ...remain} = updateClassroomDto;

        const checkClassroom = await this.classroomModel.findOne({name: remain.name})
        if (checkClassroom) {
            throw new HttpException("name taken", HttpStatus.UNAUTHORIZED);
        }

        return this.classroomModel.findByIdAndUpdate(
            classroomId,
            {$set: {speciality: speciality_id, ...remain}},
            {new: true, upsert: true}
        )
    }

    deleteClassroom(classroomId: string) {
        return this.classroomModel.findByIdAndDelete(classroomId)
    }
}
