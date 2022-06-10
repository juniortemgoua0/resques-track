import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RequestService} from "./request.service";
import {CreateRequestDto} from "./dto";

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

    @Post(':studentId')
    createRequest(
        @Param('studentId') studentId: string,
        @Body() createRequestDto: CreateRequestDto
    ) {
        return this.requestService.createRequest(studentId, createRequestDto);
    }
}
