import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateCourseDto, UpdateCourseDto} from "./dto";
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {Model} from "mongoose";
import {CourseDocument} from "./course.schema";
import { ClassroomDocument} from "../classroom/classroom.schema";

@Injectable()
export class CourseService {

    constructor(
        @InjectModel(ModelName.COURSE) private readonly courseModel: Model<CourseDocument>,
        @InjectModel(ModelName.CLASSROOM) private readonly classroomModel: Model<ClassroomDocument>
    ) {
    }

    getAllCourse() {
        return this.courseModel.find().populate(["classrooms"]).exec();
    }

    getOneCourse(courseId: string) {
        return this.courseModel.findById(courseId).populate(["classrooms"]).exec();
    }

    async createCourse(createCourseDto: CreateCourseDto) {
        const {classrooms: classrooms, ...remain} = createCourseDto

        const checkCourse = await this.courseModel.findOne({name: remain.name});
        if (checkCourse) {
            throw new HttpException("name taken", HttpStatus.UNAUTHORIZED);
        }

        const createCourse = await new this.courseModel({
            ...remain
        }).save();

        if (classrooms.length > 0) {
            for (let classroom_id of classrooms) {
                await this.classroomModel.findByIdAndUpdate(
                    classroom_id,
                    {$push : { courses: createCourse}},
                    {new: true, upsert: true}
                );
            }
        }

        return createCourse;
    }

    updateCourse(courseId: string, updateCourseDto: UpdateCourseDto) {

    }

    deleteCourse(courseId: string) {

    }
}
