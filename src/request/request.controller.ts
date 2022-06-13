/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards} from '@nestjs/common';
import {RequestService} from "./request.service";
import {
    AssignRequestDto,
    ChangeStatusDto,
    CreateRequestDto,
    RejectRequestDto,
    TreatRequestDto,
    UpdateRequestDto
} from './dto';
import {Roles} from "../auth/decorators/roles.decorator";
import {Role} from "../helpers";
import {JwtAuthGuard} from "../auth/security/guard/jwt-auth.guard";
import {RolesGuard} from "../auth/security/guard/roles.guard";

@Controller('request')
export class RequestController {

    constructor(private requestService: RequestService) {
    }

    // @Get('')
    // getAllRequests() {
    //     return this.requestService.getAllRequests();
    // }

    @Roles(Role.STUDENT , Role.SECRETARY, Role.EXECUTIVE_OFFICER, Role.HEAD_OF_DEPARTMENT , Role.TEACHER, Role.IT_OFFICER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('')
    getUsersCorrespondRequest(@Request() req: any){
        return this.requestService.getUsersCorrespondRequest(req.user);
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
    @Roles(Role.HEAD_OF_DEPARTMENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
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

    @Roles(Role.HEAD_OF_DEPARTMENT, Role.TEACHER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('assign/teacher/:teacherId')
    getTeacherAssignRequests(@Param('teacherId') teacherId: string) {
        return this.requestService.getTeacherAssignRequests(teacherId)
    }

    /*
    * End assign*/


    /*
    * Start request treatment operation*/
    @Roles(Role.HEAD_OF_DEPARTMENT, Role.TEACHER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('treat/:requestId')
    treatRequest(
        @Param('requestId') requestId: string,
        @Body() treatRequestDto: TreatRequestDto
    ) {
        return this.requestService.treatRequest(requestId, treatRequestDto);
    }

    @Roles(Role.HEAD_OF_DEPARTMENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
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
    @Roles(Role.HEAD_OF_DEPARTMENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('deliberate/:requestId')
    deliberateTreatRequest(
        @Param('requestId') requestId: string,
    ) {
        return this.requestService.deliberateTreatRequest(requestId);
    }
    /*
   * End deliberation*/


    /*
    * Start request publishing operation*/
    @Roles(Role.EXECUTIVE_OFFICER)
    @UseGuards(JwtAuthGuard, RolesGuard)
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
    @Roles(Role.SECRETARY)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('reject/:requestId')
    rejectRequest(
        @Param('requestId') requestId: string,
        @Body() rejectRequestDto: RejectRequestDto,
        @Request() req: any
    ) {
        return this.requestService.rejectRequest(requestId, rejectRequestDto, req.user);
    }

    /*
    * End reject*/


    /*
     * Start request accept operation*/
    @Roles(Role.SECRETARY)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('accept/:requestId')
    acceptRequest(
        @Param('requestId') requestId: string,
    ) {
        return this.requestService.acceptRequest(requestId);
    }

    /*
    * End accept*/
    @Roles(Role.STUDENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('')
    createRequest(@Body() createRequestDto: CreateRequestDto) {
        return this.requestService.createStudentRequest(createRequestDto)
    }

    @Roles(Role.STUDENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':requestId')
    updateRequest(
        @Param('requestId') requestId: string,
        @Body() updateRequestDto: UpdateRequestDto
    ) {
        return this.requestService.updateStudentRequest(requestId, updateRequestDto);
    }

    @Roles(Role.STUDENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':requestId')
    deleteSpeciality(@Param('requestId') requestId: string) {
        return this.requestService.deleteRequest(requestId);
    }

}
