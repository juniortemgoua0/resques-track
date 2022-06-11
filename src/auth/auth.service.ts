import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CheckUsernameDto, SignUpDto} from "./dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserDocument} from "../user/user.schema";
import {StudentDocument} from "../student/student.schema";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import {ModelName} from "../helpers";
import {PersonnelDocument} from "../personnel/schema/personnel.schema";

export enum UserStatusType {
    USER = "user",
    STUDENT = "student",
    PERSONNEL = "personnel"
}

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(ModelName.USER) private readonly userModel: Model<UserDocument>,
        @InjectModel(ModelName.STUDENT) private readonly studentModel: Model<StudentDocument>,
        @InjectModel(ModelName.PERSONNEL) private readonly personnelModel: Model<PersonnelDocument>,
        private userService: UserService,
        private jwtService: JwtService
    ) {
    }

    async checkUsername(checkUsernameDto: CheckUsernameDto) {
        const {username, school_id} = checkUsernameDto

        /*
        *First we are checking if the dto information corresponds to any user in UserModel. If so it is,
        * we return the corresponds user with a status key whose allow the front-end developer know
        * this data key inside this return object contain a user 
        * */
        const checkUser = (await this.userModel.findOne({email: username})) ||
            (await this.userModel.findOne({phone_number: username}));
        if (checkUser) {
            return {
                status: UserStatusType.USER,
                data: checkUser
            }
        }

        /*
        * At there we are making the same treatment as in the previous case just that here we return a student 
        * instead 
        * */
        const checkStudent = (await this.studentModel.findOne({email: username}).where({school: school_id})) ||
            (await this.studentModel.findOne({phone_number: username}).where({school: school_id}));
        if (checkStudent) {
            return {
                status: UserStatusType.STUDENT,
                data: checkStudent
            }
        }

        const checkPersonnel = (await this.personnelModel.findOne({email: username}).where({school: school_id})) ||
            (await this.personnelModel.findOne({phone_number: username}).where({school: school_id}));
        if (checkPersonnel) {
            return {
                status: UserStatusType.PERSONNEL,
                data: checkPersonnel
            }
        }
        throw new HttpException("This user is not register into our system ", HttpStatus.NOT_FOUND);
    }

    async signUp(signUpDto: SignUpDto) {

        const {email, phone_number, password, current_user_id, user_status} = signUpDto;

        /*
        * We are checking if this email or password is already use by another user
        * then throw error if is that the case and return the new user if is not 
        * */
        const checkUser = (await this.userModel.findOne({email})) ||
            (await this.userModel.findOne({phone_number}));
        if (checkUser) {
            throw new HttpException("Email or phone_number taken", HttpStatus.UNAUTHORIZED);
        }

        const checkStudent = (await this.studentModel.findOne({email: email})) ||
            (await this.studentModel.findOne({phone_number: phone_number}));

        const checkPersonnel = (await this.personnelModel.findOne({email: email})) ||
            (await this.personnelModel.findOne({phone_number: phone_number}));

        if (!checkStudent && !checkPersonnel) {
            throw new HttpException("This users information are not corresponds to any register student or personnel  into our system ", HttpStatus.UNAUTHORIZED);
        }

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt);

        if (user_status === UserStatusType.STUDENT) {

            return new this.userModel({
                ...signUpDto,
                password: hashPassword,
                student: current_user_id
            }).save

        } else if (user_status === UserStatusType.PERSONNEL) {

            return new this.userModel({
                ...signUpDto,
                password: hashPassword,
                personnel: current_user_id,
            }).save()
        }
    }

    signIn(user: any) {
        const payload = {username: user.email, sub: user._id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(username: string, password: string): Promise<any> {

        const user = await this.userService.findOne(username);
        if (user) {
            const isMatch = await bcrypt.compare(password, user['password']);
            if (user && isMatch) {
                const {password, ...result} = user
                return result
            }
        }
        return null
    }
}