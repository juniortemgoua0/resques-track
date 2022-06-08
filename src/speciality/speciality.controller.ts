import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {SpecialityService} from "./speciality.service";
import {CreateSpecialityDto, UpdateSpecialityDto} from "./dto";

@Controller('speciality')
export class SpecialityController {

    constructor(private specialityService: SpecialityService) {
    }

    @Get('')
    getAllSpecialities() {
        return this.specialityService.getAllSpecialities();
    }

    @Get(':specialityId')
    getOneSpeciality(@Param('specialityId') specialityId: string) {
        return this.specialityService.getOneSpeciality(specialityId);
    }

    @Post('')
    createSpeciality(@Body() createSpecialityDto: CreateSpecialityDto) {
        return this.specialityService.createSpeciality(createSpecialityDto)
    }

    @Put(':specialityId')
    updateSpeciality(
        @Param('specialityId') specialityId: string,
        @Body() updateSpecialityDto: UpdateSpecialityDto
    ) {
        return this.specialityService.updateSpeciality(specialityId , updateSpecialityDto);
    }

    @Delete(':specialityId')
    deleteSpeciality(@Param('specialityId') specialityId: string){
        return this.specialityService.deleteSpeciality(specialityId);
    }
}
