import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {DepartmentService} from "./department.service";
import {CreateDepartmentDto, UpdateDepartmentDto} from "./dto";

@Controller('department')
export class DepartmentController {

    constructor(private departmentService: DepartmentService) {
    }

    @Get('')
    getAllDepartments() {
        return this.departmentService.getAllDepartments();
    }

    @Get(':departmentId')
    getOneDepartment(@Param('departmentId') departmentId: string) {
        return this.departmentService.getOneDepartment(departmentId);
    }

    @Post('')
    createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.departmentService.createDepartment(createDepartmentDto);
    }

    @Put(':departmentId')
    updateDepartment(
        @Param('departmentId') departmentId: string,
        @Body() updateDepartmentDto: UpdateDepartmentDto
    ){
        return this.departmentService.updateDepartment(departmentId , updateDepartmentDto)
    }

    @Delete(':departmentId')
    deleteDepartment(@Param('departmentId') departmentId : string){
        return this.departmentService.deleteDepartment(departmentId);
    }
}
