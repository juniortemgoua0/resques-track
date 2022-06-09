import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserDocument} from "./user.schema";
import {UpdateUserDto} from "./dto";
import {ModelName} from "../helpers";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(ModelName.USER) private readonly userModel: Model<UserDocument>
    ) {
    }

    getAllUsers() {
        return this.userModel.find().populate(["student"]).exec();
    }

    getOneUser(userId: string) {
        return this.userModel.findById(userId).populate(["student"]).exec();
    }

    updateUser(userId: string, updateUserDto: UpdateUserDto) {

    }


    deleteUser(userId: string) {
        return this.userModel.findByIdAndDelete(userId);
    }

    async findOne(username: string) {
        return (await this.userModel.findOne({email: username})) ||
            (await this.userModel.findOne({phone_number: username}))
    }
}
