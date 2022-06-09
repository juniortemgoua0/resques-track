/* eslint-disable prettier/prettier */
import {Controller, Get, Param} from '@nestjs/common';
import {RequestService} from "./request.service";

@Controller('request')
export class RequestController {

    constructor(private requestService: RequestService) {
    }

    @Get('')
    getAllRequests(){
        return this.requestService.getAllRequests();
    }

    @Get(':studentId')
    getStudentRequests(@Param('studentId') studentId: string){
        return this.requestService.getStudentRequests(studentId)
    }

    // @Get('')
    // getSecretaryRequests(){

    // }
}
