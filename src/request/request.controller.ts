/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {RequestService} from "./request.service";
import {AssignRequestDto, ChangeStatusDto, TreatRequestDto, UpdateRequestDto} from './dto';
import {CreateRequestDto} from './dto';

@Controller('request')
export class RequestController {

    constructor(private requestService: RequestService) {
    }

    @Get('')
    getAllRequests() {
        return this.requestService.getAllRequests();
    }

    @Get(':studentId')
    getStudentRequest(@Param('studentId') studentId: string) {
        return this.requestService.getStudentRequests(studentId)
    }

    @Get('/school/:schoolId')
    getRequestsBySchool(@Param('schoolId') schoolId: string) {
        return this.requestService.getRequestsBySchool(schoolId)
    }


    /*
    * Status operation on request*/

    @Get('status/:status')
    getRequestsByStatus(@Param('status', ParseIntPipe) status: number) {
        return this.requestService.getRequestsByStatus(status)
    }

    @Post('status/:requestId')
    changeRequestStatus(
        @Param('requestId') requestId: string,
        @Body() changeStatusDto: ChangeStatusDto
    ) {
        return this.requestService.changeRequestStatus(requestId, changeStatusDto)
    }

    /*
    * Assign request operation*/

    @Post('assign/:requestId')
    assignRequestToTeacher(
        @Param('requestId') requestId: string,
        @Body() assignRequestDto: AssignRequestDto
    ) {
        return this.requestService.assignRequestToTeacher(requestId, assignRequestDto)
    }

    @Get('assign/:schoolId')
    getAllAssignRequests(@Param('schoolId') schoolId: string) {
        return this.requestService.getAllAssignRequests(schoolId)
    }

    @Get('assign/teacher/:teacherId')
    getTeacherAssignRequests(@Param('teacherId') teacherId: string) {
        return this.requestService.getTeacherAssignRequests(teacherId)
    }


    /*
    * End assign*/

    @Post('treat/:requestId')
    treatRequest(
        @Param('requestId') requestId: string,
        @Body() treatRequestDto: TreatRequestDto
    ) {
        return this.requestService.treatRequest(requestId, treatRequestDto);
    }

    /*
    * Start request treatment operation*/


    /*
    * End treatment*/

    @Post('')
    createRequest(@Body() createRequestDto: CreateRequestDto) {
        return this.requestService.createStudentRequest(createRequestDto)
    }


    @Put(':requestId')
    updateRequest(
        @Param('requestId') requestId: string,
        @Body() updateRequestDto: UpdateRequestDto
    ) {
        return this.requestService.updateStudentRequest(requestId, updateRequestDto);
    }

    @Delete(':requestId')
    deleteSpeciality(@Param('requestId') requestId: string) {
        return this.requestService.deleteRequest(requestId);
    }
}
