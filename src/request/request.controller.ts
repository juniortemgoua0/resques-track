/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {RequestService} from "./request.service";
import {AssignRequestDto, ChangeStatusDto, RejectRequestDto, TreatRequestDto, UpdateRequestDto} from './dto';
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


    /*
    * Start request treatment operation*/
    @Post('treat/:requestId')
    treatRequest(
        @Param('requestId') requestId: string,
        @Body() treatRequestDto: TreatRequestDto
    ) {
        return this.requestService.treatRequest(requestId, treatRequestDto);
    }

    @Put('treat/validate/:requestId')
    validateTreatRequest(
        @Param('requestId') requestId: string,
    ) {
        return this.requestService.validateTreatRequest(requestId);
    }
    /*
    * End treatment*/


    /*
    * Start request deliberation operation*/
    @Put('deliberate/:requestId')
    deliberateTreatRequest(
        @Param('requestId') requestId: string,
    ) {
        return this.requestService.deliberateTreatRequest(requestId);
    }
    /*
   * End treatment*/


    /*
    * Start request publishing operation*/
    @Put('publishing/:requestId')
    publishingRequest(
        @Param('requestId') requestId: string,
    ) {
        return this.requestService.publishingRequest(requestId);
    }
    /*
   * End publishing*/


    /*
     * Start request reject operation*/
    @Post('reject/:requestId')
    rejectRequest(
        @Param('requestId') requestId: string,
        @Body() rejectRequestDto: RejectRequestDto
    ) {
        return this.requestService.rejectRequest(requestId, rejectRequestDto);
    }

    /*
    * End reject*/


    /*
     * Start request accept operation*/
    @Put('accept/:requestId')
    acceptRequest(
        @Param('requestId') requestId: string,
    ) {
        return this.requestService.acceptRequest(requestId);
    }
    /*
    * End accept*/

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
