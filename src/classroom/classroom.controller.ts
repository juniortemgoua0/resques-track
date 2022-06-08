import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ClassroomService} from "./classroom.service";
import {CreateClassroomDto, UpdateClassroomDto} from "./dto";


@Controller('classroom')
export class ClassroomController {

    constructor(private classroomService: ClassroomService) {
    }

    @Get('')
    getAllClassrooms() {
        return this.classroomService.getAllClassrooms();
    }

    @Get(':classroomId')
    getOneClassroom(@Param('classroomId') classroomId: string){
        return this.classroomService.getOneClassroom(classroomId);
    }

    @Post('')
    createClassroom(@Body() createClassroomDto: CreateClassroomDto) {
        return this.classroomService.createClassroom(createClassroomDto);
    }

    @Put(':classroomId')
    updateClassroom(
        @Param('classroomId') classroomId: string,
        @Body() updateClassroomDto: UpdateClassroomDto
    ){
        return this.classroomService.updateClassroom(classroomId , updateClassroomDto)
    }

    @Delete(':classroomId')
    deleteClassroom(@Param('classroomId') classroomId : string){
        return this.classroomService.deleteClassroom(classroomId);
    }
}
