import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {Model} from "mongoose";
import {DepartmentDocument} from "./department.schema";
import {CreateDepartmentDto, UpdateDepartmentDto} from "./dto";
import {SchoolDocument} from "../school/school.schema";

@Injectable()
export class DepartmentService {

    constructor(
        @InjectModel(ModelName.DEPARTMENT) private  departmentModel: Model<DepartmentDocument>,
        @InjectModel(ModelName.SCHOOL) private schoolModel: Model<SchoolDocument>
    ) {
    }

    getAllDepartments() {
        return this.departmentModel.find().populate(["school", "specialities"]).exec();
    }

    getOneDepartment(departmentId: string) {
        return this.departmentModel.findById(departmentId).populate(["school", "specialities"]).exec();
    }

    async createDepartment(createDepartmentDto: CreateDepartmentDto) {
        const {school_id, ...remain} = createDepartmentDto;

        const checkDepartment = await this.departmentModel.findOne({name: remain.name});
        if (checkDepartment) {
            throw new HttpException("name taken", HttpStatus.UNAUTHORIZED);
        }

        const createdDepartment = await new this.departmentModel({
            ...remain,
            school: school_id
        }).save();

        await this.schoolModel.findByIdAndUpdate(
            school_id,
            {$push: {departments: createdDepartment}},
            {new: true, upsert: true}
        );

        return createdDepartment;
    }

    async updateDepartment(departmentId: string, updateDepartmentDto: UpdateDepartmentDto) {

        const {school_id , ...remain} = updateDepartmentDto;

        const checkDepartment = await this.departmentModel.findOne({name: remain.name});
        if (checkDepartment) {
            throw new HttpException("name taken", HttpStatus.UNAUTHORIZED);
        }

        return this.departmentModel.findByIdAndUpdate(
            departmentId,
            {$set : {...remain , school: school_id}},
            {new : true , upsert: true}
        )
    }

    deleteDepartment(departmentId: string) {
        return this.departmentModel.findByIdAndDelete(departmentId);
    }
}
