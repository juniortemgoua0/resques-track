import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {PersonnelService} from "./personnel.service";
import {CreatePersonnelDto, UpdatePersonnelDto} from "./dto";

@Controller('personnel')
export class PersonnelController {

    constructor(private personnelService: PersonnelService) {
    }

    @Get('')
    getAllPersonnel(){
        return this.personnelService.getAllPersonnel()
    }

    @Get(':personnelId')
    getOnePersonnel(@Param('personnelId') personnelId: string) {
        return this.personnelService.getOnePersonnel(personnelId);
    }

    @Post('')
    createStudent(@Body() createPersonnelDto: CreatePersonnelDto) {
        return this.personnelService.createPersonnel(createPersonnelDto);
    }

    @Put(':personnelId')
    updatePersonnel(
        @Body() updatePersonnelDto: UpdatePersonnelDto,
        @Param('personnelId') personnelId: string
    ) {
        return this.personnelService.updatePersonnel(personnelId , updatePersonnelDto);
    }

    @Delete(':personnelId')
    deletePersonnel(@Param('personnelId') personnelId : string ){
        return this.personnelService.deletePersonnel(personnelId)
    }
}
