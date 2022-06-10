/* eslint-disable prettier/prettier */
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {RequestService} from "./request.service";
import { UpdateRequestDto } from './dto';
import { CreateRequestDto } from './dto';

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

    // @Get('')
    // getSecretaryRequests(){

    // }

    @Post('')
    createRequest(@Body() createRequestDto: CreateRequestDto) {
        return this.requestService.createStudentRequest(createRequestDto)
    }

    @Put(':requestId')
    updateRequest(
        @Param('requestId') requestId: string,
        @Body() updateRequestDto: UpdateRequestDto
    ) {
        return this.requestService.updateStudentRequest(requestId , updateRequestDto);
    }

    @Delete(':requestId')
    deleteSpeciality(@Param('requestId') requestId: string){
        return this.requestService.deleteRequest(requestId);
    }
}
