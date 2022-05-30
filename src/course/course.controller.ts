import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {DepartmentService} from "../department/department.service";
import {CreateDepartmentDto, UpdateDepartmentDto} from "../department/dto";
import {CourseService} from "./course.service";
import {CreateCourseDto, UpdateCourseDto} from "./dto";

@Controller('course')
export class CourseController {

    constructor(private courseService: CourseService) {
    }

    @Get('')
    getAllCourse() {
        return this.courseService.getAllCourse();
    }

    @Get(':courseId')
    getOneCourse(@Param('courseId') courseId: string) {
        return this.courseService.getOneCourse(courseId);
    }

    @Post('')
    createCourse(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.createCourse(createCourseDto);
    }

    @Put(':courseId')
    updateCourse(
        @Param('courseId') courseId: string,
        @Body() updateCourseDto: UpdateCourseDto
    ){
        return this.courseService.updateCourse(courseId , updateCourseDto)
    }

    @Delete(':courseId')
    deleteCourse(@Param('courseId') courseId : string){
        return this.courseService.deleteCourse(courseId);
    }

}
