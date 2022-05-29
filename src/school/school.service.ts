import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ModelName} from "../helpers/model-helpers";
import {Model} from "mongoose";
import {SchoolDocument} from "./school.schema";
import {CreateSchoolDto, UpdateSchoolDto} from "./dto";

@Injectable()
export class SchoolService {

    constructor(
        @InjectModel(ModelName.SCHOOL) private readonly schoolModel: Model<SchoolDocument>
    ) {
    }

    getAllSchools() {
        return this.schoolModel.find();
    }

    getOneSchool(schoolId: string) {
        return this.schoolModel.findById(schoolId);
    }

    createSchool(createUserDto: CreateSchoolDto) {
        const createdSchool = new this.schoolModel(createUserDto);
        return createdSchool.save();
    }

    updateSchool(schoolId: string, updateSchoolDto: UpdateSchoolDto) {
        return this.schoolModel.findByIdAndUpdate(
            schoolId,
            {$set: updateSchoolDto},
            {new: true, upsert: true}
        )
    }

    deleteSchool(schoolId: string) {
        return this.schoolModel.findByIdAndDelete(schoolId)
    }
}
