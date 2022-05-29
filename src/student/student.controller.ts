import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {StudentService} from "./student.service";
import {CreateStudentDto, UpdateStudentDto} from "./dto";

@Controller('student')
export class StudentController {

    constructor(private studentService: StudentService) {
    }

    @Get('')
    getAllStudents() {
        return this.studentService.getAllStudents();
    }

    @Get(':studentId')
    getOneStudent(@Param('studentId') studentId: string) {
        return this.studentService.getOneStudent(studentId);
    }

    @Post('')
    createStudent(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.createStudent(createStudentDto);
    }

    @Put(':studentId')
    updateStudent(
        @Body() updateStudentDto: UpdateStudentDto,
        @Param('studentId') studentId: string
    ) {
        return this.studentService.updateStudent(studentId , updateStudentDto);
    }

    @Delete(':studentId')
    deleteStudent(@Param('studentId') studentId : string ){
        return this.studentService.deleteStudent(studentId)
    }
}
