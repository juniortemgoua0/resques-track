/* eslint-disable prettier/prettier */
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "../helpers";
import {Model, Schema} from "mongoose";
import {SpecialityDocument} from "./speciality.schema";
import {CreateSpecialityDto, UpdateSpecialityDto} from "./dto";
import {DepartmentDocument} from "../department/department.schema";
import * as mongoose from "mongoose";

@Injectable()
export class SpecialityService {

    constructor(
        @InjectModel(ModelName.SPECIALITY) private readonly specialityModel: Model<SpecialityDocument>,
        @InjectModel(ModelName.DEPARTMENT) private readonly departmentModel: Model<DepartmentDocument>
    ) {
    }

    getAllSpecialities() {
        return this.specialityModel.find().populate(["classrooms", "department"]).exec();
    }

    getOneSpeciality(specialityId: string) {
        return this.specialityModel.findById(specialityId).populate(["classrooms", "department"]).exec();
    }

    async createSpeciality(createSpecialityDto: CreateSpecialityDto) {

        const {department_id, ...remain} = createSpecialityDto;

        const checkSpeciality = await this.specialityModel.findOne({name: remain.name})
        if (checkSpeciality) {
            throw new HttpException("name taken", HttpStatus.UNAUTHORIZED)
        }

        const createdSpeciality = await new this.specialityModel({
            ...remain,
            department: department_id
        }).save();

        await this.departmentModel.findByIdAndUpdate(
            department_id,
            {$push: {specialities: createdSpeciality}},
            {new: true, upsert: true}
        );

        return createdSpeciality;
    }

    async updateSpeciality(specialityId: string, updateSpecialityDto: UpdateSpecialityDto) {

        const {department_id, ...remain} = updateSpecialityDto;

        const checkSpeciality = await this.specialityModel.findOne({name: remain.name})

        if (checkSpeciality) {
            throw new HttpException("name taken", HttpStatus.UNAUTHORIZED)
        }
        return this.specialityModel.findByIdAndUpdate(
            specialityId,
            {$set: { department : department_id , ...remain}},
            {new: true, upsert: true}
        )
    }

    deleteSpeciality(specialityId: string) {
        return this.specialityModel.findByIdAndDelete(specialityId);
    }
}