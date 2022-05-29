import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {SchoolService} from "./school.service";
import {CreateSchoolDto, UpdateSchoolDto} from "./dto";

@Controller('school')
export class SchoolController {

    constructor(private schoolService: SchoolService) {
    }

    @Get('')
    getAllSchools() {
        return this.schoolService.getAllSchools();
    }

    @Get(':schoolId')
    getOneSchool(@Param('schoolId') schoolId: string) {
        return this.schoolService.getOneSchool(schoolId);
    }

    @Post('')
    createSchool(@Body() createUserDto: CreateSchoolDto) {
        return this.schoolService.createSchool(createUserDto);
    }

    @Put(':schoolId')
    updateUser(
        @Param('schoolId') schoolId: string,
        @Body() updateSchoolDto: UpdateSchoolDto
    ) {
        return this.schoolService.updateSchool(schoolId , updateSchoolDto);
    }

    @Delete(':schoolId')
    deleteSchool(@Param('schoolId') schoolId : string){
        return this.schoolService.deleteSchool(schoolId);
    }
}
