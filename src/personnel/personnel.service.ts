import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ModelName, Role} from "../helpers";
import {Model} from "mongoose";
import {PersonnelDocument} from "./schema/personnel.schema";
import {CreatePersonnelDto, UpdatePersonnelDto} from "./dto";
import {DepartmentDocument} from "../department/department.schema";
import {SchoolDocument} from "../school/school.schema";

@Injectable()
export class PersonnelService {

    constructor(
        @InjectModel(ModelName.PERSONNEL) private readonly personnelModel: Model<PersonnelDocument>,
        @InjectModel(ModelName.DEPARTMENT) private readonly departmentModel: Model<DepartmentDocument>,
        @InjectModel(ModelName.SCHOOL) private readonly schoolModel: Model<SchoolDocument>
    ) {
    }

    getAllPersonnel(schoolId: string) {
        return this.personnelModel.find()
            .where({school: schoolId})
            .populate(['school'])
    }

    getOnePersonnel(personnelId: string) {
        return this.personnelModel.findById(personnelId).populate(['department'])
    }

    async createPersonnel(createPersonnelDto: CreatePersonnelDto) {

        const {school_id, department_id, ...remain} = createPersonnelDto;

        const checkPersonnel = (await this.personnelModel.findOne({email: remain.email})) ||
            (await this.personnelModel.findOne({phone_number: remain.phone_number}));

        if (checkPersonnel) {
            throw new HttpException("email or phone_number taken", HttpStatus.UNAUTHORIZED);
        }

        const newPersonnel = await new this.personnelModel({
            ...remain,
            school: school_id,
            department: department_id
        }).save();

        await this.schoolModel.findByIdAndUpdate(
            school_id,
            {$push: {personnel: newPersonnel}},
            {new: true, upsert: true}
        )

        return newPersonnel;
    }

    async updatePersonnel(personnelId: string, updatePersonnelDto: UpdatePersonnelDto) {

    }

    deletePersonnel(personnelId: string) {

    }

    getTeacherPersonnel() {
        return this.personnelModel.find()
            .where({role: Role.TEACHER})
    }
}
